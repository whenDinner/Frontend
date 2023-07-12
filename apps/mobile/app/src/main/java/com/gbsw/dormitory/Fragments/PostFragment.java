package com.gbsw.dormitory.Fragments;

import android.content.Context;
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

import androidx.activity.OnBackPressedCallback;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;

import com.gbsw.dormitory.R;

import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.HttpStatusException;
import org.jsoup.Jsoup;

import java.util.concurrent.atomic.AtomicBoolean;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;

public class PostFragment  extends Fragment {
    private TextView titleView;
    private TextView subtitleView;
    private TextView contentView;

    private TextView backBtn;

    private FragmentManager fm;

    private View btnComment;

    private LinearLayout layoutComment;

    private LinearLayout layoutComments;
    private Button btnCommentUp;
    private EditText editText;

    private Button btnDelete;

    public AtomicBoolean isOpen = new AtomicBoolean(false);

    private int dpToPx(int dp) {
        float scale = getResources().getDisplayMetrics().density;
        return (int) (dp * scale + 0.5f);
    }

    public void closeComment() {
        if (isOpen.get()) {
            Animation close = new Animation() {
                @Override
                protected void applyTransformation(float iT, Transformation t) {
                    int height = dpToPx(400);
                    int edited = height - (int) ((int) height * iT);

                    if (edited >= dpToPx(45))
                        layoutComment.getLayoutParams().height = edited;
                    else layoutComment.getLayoutParams().height = dpToPx(45);
                    layoutComment.requestLayout();
                }
            };
            close.setDuration(300);
            layoutComment.startAnimation(close);
            isOpen.set(false);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup viewGroup, Bundle savedInstanceState) {
        LinearLayout layout = (LinearLayout) inflater.inflate(R.layout.fragment_post, viewGroup, false);

        fm = getActivity().getSupportFragmentManager();
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(getContext());

        editText = layout.findViewById(R.id.edittext_comment);

        layoutComment = layout.findViewById(R.id.layout_comment);
        layoutComments = layout.findViewById(R.id.layout_comments);

        btnComment = layout.findViewById(R.id.btn_comment);
        btnComment.setOnClickListener(e -> {
            int height = dpToPx(400);

            Animation open = new Animation() {
                @Override
                protected void applyTransformation(float iT, Transformation t) {
                    int edited = (int) ((int) height * iT);

                    if (edited >= dpToPx(45))
                        layoutComment.getLayoutParams().height = edited;
                    layoutComment.requestLayout();
                }
            };
            open.setDuration(300);

            Animation close = new Animation() {
                @Override
                protected void applyTransformation(float iT, Transformation t) {
                    int edited = height - (int) ((int) height * iT);

                    if (edited >= dpToPx(45))
                        layoutComment.getLayoutParams().height = edited;
                    else layoutComment.getLayoutParams().height = dpToPx(45);
                    layoutComment.requestLayout();
                }
            };
            close.setDuration(300);

            if (!isOpen.get()) {
                isOpen.set(true);
                layoutComment.startAnimation(open);
            } else {
                isOpen.set(false);
                layoutComment.startAnimation(close);
            }
        });

        titleView = layout.findViewById(R.id.title);
        subtitleView = layout.findViewById(R.id.subtitle);
        contentView = layout.findViewById(R.id.content);

        backBtn = layout.findViewById(R.id.backBtn);
        backBtn.setOnClickListener(e -> {
            fm.beginTransaction().remove(this).commit();
            fm.popBackStack();
        });

        String userId = preferences.getString("id", "");

        Bundle data = getArguments();
        String title = data.getString("title");
        String type = data.getString("type");
        String author = data.getString("author");
        String date = data.getString("createdAt");
        String content = data.getString("content");
        int id = data.getInt("id");

        btnDelete = layout.findViewById(R.id.btn_delete);

        btnDelete.setOnClickListener(e -> {
            // TODO
            new Thread(() -> {
                try {
                    JSONObject json = new JSONObject();
                    json.put("id", id);

                    RequestBody body = RequestBody.create(
                            json.toString(),
                            MediaType.parse("application/json; charset=utf-8")
                    );

                    OkHttpClient client = new OkHttpClient();
                    Request request = new Request.Builder()
                            .url("https://drm.gbsw.hs.kr/api/community/post/delete")
                            .header("Authorization", "Bearer " + preferences.getString("token", ""))
                            .header("Content-Type", "application/json")
                            .delete(body)
                            .build();
                    client.newCall(request).execute();

                    getActivity().runOnUiThread(() -> {
                        Toast.makeText(getActivity(), "글이 삭제되었습니다.", Toast.LENGTH_SHORT).show();
                        fm.beginTransaction().remove(this).commit();
                        fm.popBackStack();
                    });
                } catch (Exception e1) {
                    getActivity().runOnUiThread(() -> {
                        Toast.makeText(getActivity(), "서비스 통신 상태가 좋지 않습니다.", Toast.LENGTH_SHORT).show();
                    });
                }
            }).start();
        });

        if (!userId.equals(author))
            btnDelete.setVisibility(View.GONE);

        if (type.equals("공지") || type.equals("익명 게시판"))
            layoutComment.setVisibility(View.INVISIBLE);
        else {

            new Thread(() -> {
                try {
                    JSONObject json = new JSONObject(Jsoup.connect("https://drm.gbsw.hs.kr/api/community/get/post?id=" + id)
                            .ignoreContentType(true)
                            .header("Authorization", "Bearer " + preferences.getString("token", ""))
                            .get().body().html());

                    JSONArray arr = json.getJSONArray("comments");
                    for (int i = 0; i < arr.length(); i++) {
                        JSONObject jsonObject = arr.getJSONObject(i);

                        getActivity().runOnUiThread(() -> {
                            try {
                                LinearLayout linearLayout = new LinearLayout(getContext());
                                linearLayout.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT));
                                linearLayout.setBackgroundResource(R.drawable.box_layout);
                                linearLayout.setPadding(dpToPx(10), dpToPx(10), dpToPx(10), dpToPx(10));
                                linearLayout.setOrientation(LinearLayout.VERTICAL);

                                TextView textView1 = new TextView(getContext());
                                textView1.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT));
                                textView1.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 17);
                                textView1.setText(jsonObject.getString("comment"));

                                TextView textView2 = new TextView(getContext());
                                textView2.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT));
                                textView2.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 14);
                                textView2.setTextColor(Color.parseColor("#888888"));
                                textView2.setText(jsonObject.getJSONObject("author").getString("nickname") + "(" + jsonObject.getJSONObject("author").getString("login") +
                                        ") | " + jsonObject.getString("createdAt").split("T")[0]);

                                linearLayout.addView(textView1);
                                linearLayout.addView(textView2);
                                linearLayout.setAlpha(0);

                                Animation anim = new Animation() {
                                    @Override
                                    protected void applyTransformation(float interpolatedTime, Transformation t) {
                                        linearLayout.setAlpha(interpolatedTime);
                                    }
                                };
                                anim.setDuration(200);

                                linearLayout.startAnimation(anim);
                                layoutComments.addView(linearLayout);
                            } catch (Exception e) {}
                        });
                    }
                } catch (Exception e) {
                    getActivity().runOnUiThread(() -> {
                        Toast.makeText(getActivity(), "서비스 통신 상태가 좋지 않습니다.", Toast.LENGTH_SHORT).show();
                    });
                }
            }).start();
        }

        btnCommentUp = layout.findViewById(R.id.btn_commentup);
        btnCommentUp.setOnClickListener(e -> {
            // TODO
            btnCommentUp.setEnabled(false);
            new Thread(() -> {
                try {
                    JSONObject json = new JSONObject();
                    json.put("id", id);
                    json.put("comment", editText.getText());

                    System.out.println(json);

                    JSONObject result = new JSONObject(Jsoup.connect("https://drm.gbsw.hs.kr/api/community/comment/insert")
                            .ignoreContentType(true)
                            .header("Authorization", "Bearer " + preferences.getString("token", ""))
                            .header("Content-Type", "application/json")
                            .requestBody(json.toString())
                            .post().body().html());

                    if (result.getBoolean("success")) {
                        getActivity().runOnUiThread(() -> {
                            Toast.makeText(getActivity(), "댓글이 등록되었습니다.", Toast.LENGTH_SHORT).show();
                            btnCommentUp.setEnabled(true);

                            PostFragment postFragment = new PostFragment();
                            Bundle args = new Bundle();
                            args.putString("title", title);
                            args.putString("type", type);
                            args.putString("author", author);
                            args.putString("createdAt", date);
                            args.putString("content", content);
                            args.putInt("id", id);
                            postFragment.setArguments(args);

                            fm.beginTransaction().replace(R.id.layout_middle, postFragment).commit();
                        });
                    } else {
                        getActivity().runOnUiThread(() -> {
                            Toast.makeText(getActivity(), "알 수 없는 에러가 발생했습니다.", Toast.LENGTH_SHORT).show();
                        });
                    }

                } catch (Exception e1) {
                    getActivity().runOnUiThread(() -> {
                        Toast.makeText(getActivity(), "서비스 통신 상태가 좋지 않습니다.", Toast.LENGTH_SHORT).show();
                        btnCommentUp.setEnabled(true);
                    });
                }
            }).start();
        });

        Spanned spannable = Html.fromHtml(content);

        titleView.setText("[" + type + "] " + title);
        subtitleView.setText(author + " | " + date);
        contentView.setText(spannable);
        return layout;
    }
}