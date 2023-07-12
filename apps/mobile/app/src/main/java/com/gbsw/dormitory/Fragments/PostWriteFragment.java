package com.gbsw.dormitory.Fragments;

import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.text.Html;
import android.text.Spanned;
import android.util.TypedValue;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.Transformation;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;

import com.gbsw.dormitory.R;

import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;

import java.util.concurrent.atomic.AtomicBoolean;

public class PostWriteFragment extends Fragment {
    private TextView textview_category;
    private EditText titleEditText;
    private EditText contentEditText;
    private TextView backBtn;

    private Button btnSubmit;

    private FragmentManager fm;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup viewGroup, Bundle savedInstanceState) {
        LinearLayout layout = (LinearLayout) inflater.inflate(R.layout.fragment_postwrite, viewGroup, false);

        fm = getActivity().getSupportFragmentManager();
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(getContext());

        Bundle data = getArguments();
        String type = data.getString("type");

        textview_category = layout.findViewById(R.id.textview_category);
        textview_category.setText("카테고리: " + type);

        titleEditText = layout.findViewById(R.id.title);
        contentEditText = layout.findViewById(R.id.content);
        btnSubmit = layout.findViewById(R.id.btn_submit);
        btnSubmit.setOnClickListener(e -> {
            btnSubmit.setEnabled(false);
            new Thread(() -> {
                try {
                    JSONObject rbody = new JSONObject();
                    rbody.put("title", titleEditText.getText());
                    rbody.put("content", contentEditText.getText());
                    rbody.put("type", data.getString("type"));

                    JSONObject json = new JSONObject(Jsoup.connect("https://drm.gbsw.hs.kr/api/community/post/insert")
                            .ignoreContentType(true)
                            .header("Authorization", "Bearer " + preferences.getString("token", ""))
                            .header("Content-Type", "application/json")
                            .requestBody(rbody.toString())
                            .post().body().html());

                    getActivity().runOnUiThread(() -> {
                        btnSubmit.setEnabled(true);
                        Toast.makeText(getActivity(), "글을 작성했습니다.", Toast.LENGTH_SHORT).show();
                        fm.beginTransaction().remove(this).commit();
                        fm.popBackStack();
                    });
                } catch (Exception e1) {
                    e1.printStackTrace();
                    getActivity().runOnUiThread(() -> {
                        Toast.makeText(getActivity(), "서비스 통신 상태가 좋지 않습니다.", Toast.LENGTH_SHORT).show();
                        btnSubmit.setEnabled(true);
                    });
                }
            }).start();
        });

        backBtn = layout.findViewById(R.id.backBtn);
        backBtn.setOnClickListener(e -> {
            fm.beginTransaction().remove(this).commit();
            fm.popBackStack();
        });

        if (data.get("title") != null) { // Edit
            String title = data.getString("title");
            String content = data.getString("content");
            int id = data.getInt("id");
            btnSubmit.setText("수정하기");

            titleEditText.setText(title);
            contentEditText.setText(content);
        }

        return layout;
    }
}