package com.instinct.sipcalc;

import android.annotation.SuppressLint;
import android.content.ActivityNotFoundException;
import android.content.ContentValues;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;
import androidx.webkit.WebViewAssetLoader;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

public class MainActivity extends AppCompatActivity {
    private WebView web;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        web = new WebView(this);
        setContentView(web);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setTextZoom(100);
        web.setBackgroundColor(0xFFF3F7FF);
        web.setOverScrollMode(WebView.OVER_SCROLL_NEVER);

        final WebViewAssetLoader loader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();
        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest r) {
                return loader.shouldInterceptRequest(r.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                Uri u = r.getUrl();
                if ("appassets.androidplatform.net".equals(u.getHost())) return false;
                try { startActivity(new Intent(Intent.ACTION_VIEW, u)); } catch (ActivityNotFoundException ignored) { }
                return true;
            }
        });
        web.setWebChromeClient(new WebChromeClient());
        web.addJavascriptInterface(new Bridge(), "AndroidBridge");
        web.loadUrl("https://appassets.androidplatform.net/assets/www/index.html");

        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                web.evaluateJavascript("(window.handleBack && window.handleBack()) ? 'yes' : 'no'", value -> {
                    if (value != null && value.contains("yes")) return;
                    setEnabled(false);
                    getOnBackPressedDispatcher().onBackPressed();
                    setEnabled(true);
                });
            }
        });
    }

    /** Writes the PDF into the app cache and returns a shareable content:// Uri. */
    private Uri cachePdf(String base64, String name) throws Exception {
        File dir = new File(getCacheDir(), "reports");
        if (!dir.exists() && !dir.mkdirs()) throw new Exception("could not create folder");
        // keep the cache small: remove older reports
        File[] old = dir.listFiles();
        if (old != null) for (File f : old) { if (!f.getName().equals(name)) f.delete(); }
        File out = new File(dir, safe(name));
        try (FileOutputStream fos = new FileOutputStream(out)) {
            fos.write(Base64.decode(base64, Base64.DEFAULT));
        }
        return FileProvider.getUriForFile(this, getPackageName() + ".files", out);
    }

    private static String safe(String name) {
        String n = name == null ? "report.pdf" : name.replaceAll("[^A-Za-z0-9._-]", "_");
        return n.endsWith(".pdf") ? n : n + ".pdf";
    }

    private void toast(final String msg) {
        runOnUiThread(() -> Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT).show());
    }

    public class Bridge {
        @JavascriptInterface
        public String sharePdf(String base64, String name) {
            try {
                final Uri uri = cachePdf(base64, name);
                final String fname = safe(name);
                runOnUiThread(() -> {
                    Intent send = new Intent(Intent.ACTION_SEND);
                    send.setType("application/pdf");
                    send.putExtra(Intent.EXTRA_STREAM, uri);
                    send.putExtra(Intent.EXTRA_SUBJECT, fname.replace(".pdf", "").replace('_', ' '));
                    send.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    startActivity(Intent.createChooser(send, "Send report"));
                });
                return "ok";
            } catch (Exception e) {
                return "Error: could not share the PDF (" + e.getMessage() + ")";
            }
        }

        @JavascriptInterface
        public String openPdf(String base64, String name) {
            try {
                final Uri uri = cachePdf(base64, name);
                runOnUiThread(() -> {
                    Intent view = new Intent(Intent.ACTION_VIEW);
                    view.setDataAndType(uri, "application/pdf");
                    view.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    try {
                        startActivity(view);
                    } catch (ActivityNotFoundException e) {
                        Toast.makeText(MainActivity.this, "No PDF viewer found. Use Share or Save instead.", Toast.LENGTH_LONG).show();
                    }
                });
                return "ok";
            } catch (Exception e) {
                return "Error: could not open the PDF (" + e.getMessage() + ")";
            }
        }

        @JavascriptInterface
        public String savePdf(String base64, String name) {
            String fname = safe(name);
            byte[] bytes = Base64.decode(base64, Base64.DEFAULT);
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    ContentValues cv = new ContentValues();
                    cv.put(MediaStore.MediaColumns.DISPLAY_NAME, fname);
                    cv.put(MediaStore.MediaColumns.MIME_TYPE, "application/pdf");
                    cv.put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/instinct.SIP");
                    Uri uri = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, cv);
                    if (uri == null) throw new Exception("storage unavailable");
                    try (OutputStream os = getContentResolver().openOutputStream(uri)) {
                        if (os == null) throw new Exception("storage unavailable");
                        os.write(bytes);
                    }
                    return "Saved to Downloads/instinct.SIP";
                } else {
                    File dir = new File(getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS), "reports");
                    if (!dir.exists()) dir.mkdirs();
                    File out = new File(dir, fname);
                    try (FileOutputStream fos = new FileOutputStream(out)) { fos.write(bytes); }
                    return "Saved to " + out.getAbsolutePath();
                }
            } catch (Exception e) {
                return "Error: could not save the PDF (" + e.getMessage() + ")";
            }
        }
    }
}
