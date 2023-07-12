package com.gbsw.dormitory.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;

import com.gbsw.dormitory.R;

import org.json.JSONObject;
import org.jsoup.Jsoup;

public class PrepareActivity extends AppCompatActivity {
    private ImageView loadingImg;
    private WebView webView;

    private LinearLayout layoutSelect;
    private Button btnStay;
    private Button btnGoHome;

    private Intent resultIntent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent received = getIntent();

        setContentView(R.layout.activity_prepare);

        loadingImg = findViewById(R.id.loading_img);
        webView = findViewById(R.id.webview);

        layoutSelect = findViewById(R.id.layout_select);
        layoutSelect.setVisibility(View.INVISIBLE);

        btnStay = findViewById(R.id.btn_stay);
        btnStay.setOnClickListener(e -> {
            btnStay.setEnabled(false);
            btnGoHome.setEnabled(false);
            new Thread(() -> {
                try {
                    JSONObject json = new JSONObject();
                    json.put("rh", 1);

                    JSONObject _res = new JSONObject(Jsoup.connect("https://drm.gbsw.hs.kr/api/outgo/set/rh")
                            .ignoreContentType(true)
                            .header("Authorization", "Bearer " + resultIntent.getStringExtra("token"))
                            .header("Content-Type", "application/json")
                            .requestBody(json.toString())
                            .post().body().html());

                    runOnUiThread(() -> {
                        setResult(2, resultIntent);
                        finish();
                    });
                } catch (Exception e1) {
                    e1.printStackTrace();
                }
            }).start();
        });
        btnGoHome = findViewById(R.id.btn_gohome);
        btnGoHome.setOnClickListener(e -> {
            btnGoHome.setEnabled(false);
            btnStay.setEnabled(false);
            new Thread(() -> {
                try {
                    JSONObject json = new JSONObject();
                    json.put("rh", 2);

                    System.out.println(resultIntent.getStringExtra("token"));

                    JSONObject _res = new JSONObject(Jsoup.connect("https://drm.gbsw.hs.kr/api/outgo/set/rh")
                            .ignoreContentType(true)
                            .header("Authorization", "Bearer " + resultIntent.getStringExtra("token"))
                            .header("Content-Type", "application/json")
                            .requestBody(json.toString())
                            .post().body().html());

                    runOnUiThread(() -> {
                        setResult(2, resultIntent);
                        finish();
                    });
                } catch (Exception e1) {
                    e1.printStackTrace();
                }
            }).start();
        });

        webView.setVisibility(View.INVISIBLE);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new CustomWebViewClientClass());

        new Thread(() -> {
            try {
                try {
                    JSONObject verified = new JSONObject(Jsoup.connect("https://drm.gbsw.hs.kr/api/account/verify")
                            .ignoreContentType(true)
                            .header("Authorization", "Bearer " + received.getStringExtra("token"))
                            .get()
                            .text()).getJSONObject("user");

                    resultIntent = new Intent();
                    resultIntent.putExtra("token", received.getStringExtra("token"));
                    resultIntent.putExtra("userId", verified.getString("login"));
                    resultIntent.putExtra("nickname", verified.getString("nickname"));
                    resultIntent.putExtra("fullname", verified.getString("fullname"));
                    resultIntent.putExtra("dormitory", verified.getString("roomNumber"));
                    resultIntent.putExtra("rh", verified.getInt("rh"));
                    resultIntent.putExtra("school", verified.getString("grade") + "학년 " + verified.getString("class") + "반 " + verified.getString("number") + "번");

                    if (verified.getInt("rh") == 0) {
                        runOnUiThread(() -> {
                            loadingImg.setVisibility(View.INVISIBLE);
                            webView.setVisibility(View.INVISIBLE);
                            layoutSelect.setVisibility(View.VISIBLE);
                        });
                        return;
                    }
                } catch (Exception e) {}

                String text = Jsoup.connect("https://drm.gbsw.hs.kr/api/account/getLogin")
                        .ignoreContentType(true)
                        .get().text();
                JSONObject jsonObject = new JSONObject(text);

                String link = jsonObject.getString("data").replaceAll(" ", "%20");
                runOnUiThread(() -> {
                    loadingImg.setVisibility(View.INVISIBLE);
                    layoutSelect.setVisibility(View.INVISIBLE);
                    webView.loadUrl(link);
                    webView.setVisibility(View.VISIBLE);
                });
            } catch (Exception e) {
                e.printStackTrace();
                Intent i = new Intent();
                setResult(-2, i);
                finish();
            }
        }).start();
    }

    @Override
    public void onBackPressed() {
        // Nothing
    }

    private class CustomWebViewClientClass extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            // Handling Login
            if (url.contains("id_token=") && url.contains("state=")) {
                view.loadUrl("");

                String parsedToken = url.split("id_token=")[1].split("&")[0];
                String parsedState = url.split("state=")[1].split("&")[0];

                Log.d("ParsedToken", parsedToken);
                Log.d("ParsedState", parsedState);

                // TODO
                new Thread(() -> {
                    try {
                        String text = Jsoup.connect("https://drm.gbsw.hs.kr/api/account/callback?id_token=" + parsedToken + "&state=" + parsedState)
                                .ignoreContentType(true)
                                .get()
                                .text();
                        JSONObject json = new JSONObject(text);
                        String token = json.getString("token");

                        JSONObject verified = new JSONObject(Jsoup.connect("https://drm.gbsw.hs.kr/api/account/verify")
                                .ignoreContentType(true)
                                .header("Authorization", "Bearer " + token)
                                .get()
                                .text()).getJSONObject("user");

                        resultIntent = new Intent();
                        resultIntent.putExtra("token", token);
                        resultIntent.putExtra("userId", verified.getString("login"));
                        resultIntent.putExtra("nickname", verified.getString("nickname"));
                        resultIntent.putExtra("fullname", verified.getString("fullname"));
                        resultIntent.putExtra("dormitory", verified.getString("roomNumber"));
                        resultIntent.putExtra("rh", verified.getInt("rh"));
                        resultIntent.putExtra("school", verified.getString("grade") + "학년 " + verified.getString("class") + "반 " + verified.getString("number") + "번");

                        if (verified.getInt("rh") == 0) {
                            runOnUiThread(() -> {
                                webView.setVisibility(View.INVISIBLE);
                                layoutSelect.setVisibility(View.VISIBLE);
                            });
                            return;
                        }

                        setResult(1, resultIntent);
                        finish();
                    } catch (Exception e) {}
                }).start();

                return false;
            }

            view.loadUrl(url);
            return true;
        }
    }
}
