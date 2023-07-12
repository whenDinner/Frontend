package com.gbsw.dormitory.Fragments;

import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.Transformation;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.core.content.res.ResourcesCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;

import com.gbsw.dormitory.R;

import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;

public class PostsFragment extends Fragment {
    private TextView textViewType;

    private Button btnWrite;

    private int dpToPx(int dp) {
        float scale = getResources().getDisplayMetrics().density;
        return (int) (dp * scale + 0.5f);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup viewGroup, Bundle savedInstanceState) {
        LinearLayout layout = (LinearLayout) inflater.inflate(R.layout.fragment_posts, viewGroup, false);

        FragmentManager fm = getActivity().getSupportFragmentManager();
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(getContext());

        textViewType = layout.findViewById(R.id.textview_type);

        LinearLayout childLayout = layout.findViewById(R.id.child_layout);

        Bundle bundle = getArguments();
        textViewType.setText(bundle.getString("type"));

        btnWrite = layout.findViewById(R.id.btn_write);
        btnWrite.setOnClickListener(e -> {
            PostWriteFragment postWriteFragment = new PostWriteFragment();
            Bundle args = new Bundle();
            args.putString("type", bundle.getString("type"));
            postWriteFragment.setArguments(args);

            fm.beginTransaction().replace(R.id.layout_middle, postWriteFragment).addToBackStack(null).commit();
        });

        new Thread(() -> {
            try {
                JSONObject json = new JSONObject(Jsoup.connect("https://drm.gbsw.hs.kr/api/community/get/posts?limit=20&offset=0&type=" + bundle.getString("type"))
                        .ignoreContentType(true)
                        .header("Authorization", "Bearer " + preferences.getString("token", ""))
                        .get().body().html());
                JSONArray posts = json.getJSONArray("posts");

                getActivity().runOnUiThread(() -> {
                    if (posts.length() == 0) {

                        TextView textView = new TextView(getActivity());
                        textView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                        textView.setText("올라온 글이 없습니다.");
                        textView.setTextColor(Color.parseColor("#656565"));
                        textView.setTypeface(ResourcesCompat.getFont(getContext(), R.font.notomedium));
                        textView.setGravity(Gravity.CENTER);
                        textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 15);
                        textView.setAlpha(0);

                        Animation anim = new Animation() {
                            @Override
                            protected void applyTransformation(float interpolatedTime, Transformation t) {
                                textView.setAlpha(interpolatedTime);
                            }
                        };
                        anim.setDuration(200);

                        textView.startAnimation(anim);
                        childLayout.addView(textView);
                        return;
                    }

                    for (int i = 0; i < posts.length(); i++) {
                        try {
                            JSONObject jsonObject = posts.getJSONObject(i);

                            LinearLayout linearLayout = new LinearLayout(getContext());
                            linearLayout.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT));
                            linearLayout.setBackgroundResource(R.drawable.box_layout);
                            linearLayout.setPadding(dpToPx(10), dpToPx(10), dpToPx(10), dpToPx(10));
                            linearLayout.setOrientation(LinearLayout.VERTICAL);

                            TextView textView1 = new TextView(getContext());
                            textView1.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT));
                            textView1.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 17);
                            textView1.setText("[" + jsonObject.getString("type") + "] " + jsonObject.getString("title"));

                            TextView textView2 = new TextView(getContext());
                            textView2.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT));
                            textView2.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 14);
                            textView2.setTextColor(Color.parseColor("#888888"));
                            textView2.setText(jsonObject.getJSONObject("author").getString("login") + " | " + jsonObject.getString("createdAt").split("T")[0]);

                            linearLayout.addView(textView1);
                            linearLayout.addView(textView2);
                            linearLayout.setAlpha(0);

                            linearLayout.setOnClickListener(e -> {
                                try {
                                    PostFragment pf = new PostFragment();
                                    Bundle args = new Bundle();

                                    args.putString("type", jsonObject.getString("type"));
                                    args.putString("title", jsonObject.getString("title"));
                                    args.putString("author", jsonObject.getJSONObject("author").getString("login"));
                                    args.putString("createdAt", jsonObject.getString("createdAt").split("T")[0]);
                                    args.putString("content", jsonObject.getString("content"));
                                    args.putInt("id", jsonObject.getInt("id"));
                                    pf.setArguments(args);

                                    fm.beginTransaction().replace(R.id.layout_middle, pf).commit();

                                } catch (Exception e1) {}
                            });

                            Animation anim = new Animation() {
                                @Override
                                protected void applyTransformation(float interpolatedTime, Transformation t) {
                                    linearLayout.setAlpha(interpolatedTime);
                                }
                            };
                            anim.setDuration(200);

                            linearLayout.startAnimation(anim);
                            childLayout.addView(linearLayout);
                        } catch (Exception e) {}
                    }
                });
            } catch (Exception e) {}
        }).start();

        return layout;
    }
}
