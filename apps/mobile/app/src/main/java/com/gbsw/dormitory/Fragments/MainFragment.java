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
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.core.content.res.ResourcesCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;

import com.gbsw.dormitory.R;

import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;

public class MainFragment extends Fragment {

    private LinearLayout layoutAnnounce;
    private LinearLayout layoutLostthings;
    private LinearLayout layoutBoard;
    private FragmentManager fm;

    private int dpToPx(int dp) {
        float scale = getResources().getDisplayMetrics().density;
        return (int) (dp * scale + 0.5f);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup viewGroup, Bundle savedInstanceState) {
        LinearLayout layout = (LinearLayout) inflater.inflate(R.layout.fragment_main, viewGroup, false);

        fm = getActivity().getSupportFragmentManager();

        layoutAnnounce = layout.findViewById(R.id.layout_announce);
        layoutLostthings = layout.findViewById(R.id.layout_lostthings);
        layoutBoard = layout.findViewById(R.id.layout_board);

        SharedPreferences pref = PreferenceManager.getDefaultSharedPreferences(getActivity());

        String token = pref.getString("token", "");

        new Thread(() -> {
            try {
                String str = Jsoup.connect("https://drm.gbsw.hs.kr/api/community/get/posts?limit=3&offset=0&type=공지")
                        .ignoreContentType(true)
                        .header("Authorization", token)
                        .get().body().html();

                JSONObject json = new JSONObject(str);
                JSONArray arr = json.getJSONArray("posts");

                // is none
                if (arr.length() == 0) {
                    getActivity().runOnUiThread(() -> {
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
                        layoutAnnounce.addView(textView);
                    });
                } else {
                    getActivity().runOnUiThread(() -> {
                        try {
                            for (int i = 0; i < arr.length(); i++) {
                                JSONObject jsonObject = arr.getJSONObject(i);

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
                                        pf.setArguments(args);

                                        fm.beginTransaction().replace(R.id.layout_middle, pf)
                                                .addToBackStack(null).commit();
                                    } catch (Exception e1) {
                                        e1.printStackTrace();
                                    }
                                });

                                Animation anim = new Animation() {
                                    @Override
                                    protected void applyTransformation(float interpolatedTime, Transformation t) {
                                        linearLayout.setAlpha(interpolatedTime);
                                    }
                                };
                                anim.setDuration(200);

                                linearLayout.startAnimation(anim);
                                layoutAnnounce.addView(linearLayout);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                            getActivity().runOnUiThread(() -> {
                                Toast.makeText(getContext(), "서비스 통신 상태가 좋지 않습니다.", Toast.LENGTH_SHORT).show();
                            });
                        }
                    });
                }

                str = Jsoup.connect("https://drm.gbsw.hs.kr/api/community/get/posts?limit=3&offset=0&type=분실물")
                        .ignoreContentType(true)
                        .header("Authorization", token)
                        .get().body().html();
                JSONObject json2 = new JSONObject(str);
                JSONArray arr2 = json2.getJSONArray("posts");

                if (arr2.length() == 0) {
                    getActivity().runOnUiThread(() -> {
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
                        layoutLostthings.addView(textView);
                    });
                } else {
                    getActivity().runOnUiThread(() -> {
                        try {
                            for (int i = 0; i < arr2.length(); i++) {
                                JSONObject jsonObject = arr2.getJSONObject(i);

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
                                        pf.setArguments(args);

                                        fm.beginTransaction().replace(R.id.layout_middle, pf)
                                                .addToBackStack(null).commit();
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
                                layoutLostthings.addView(linearLayout);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                            getActivity().runOnUiThread(() -> {
                                Toast.makeText(getContext(), "서비스 통신 상태가 좋지 않습니다.", Toast.LENGTH_SHORT).show();
                            });
                        }
                    });
                }

                str = Jsoup.connect("https://drm.gbsw.hs.kr/api/community/get/posts?limit=3&offset=0&type=게시글")
                        .ignoreContentType(true)
                        .header("Authorization", token)
                        .get().body().html();
                JSONObject json3 = new JSONObject(str);
                JSONArray arr3 = json3.getJSONArray("posts");

                if (arr3.length() == 0) {
                    getActivity().runOnUiThread(() -> {
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
                        layoutBoard.addView(textView);
                    });
                } else {
                    getActivity().runOnUiThread(() -> {
                        try {
                            for (int i = 0; i < arr3.length(); i++) {
                                JSONObject jsonObject = arr3.getJSONObject(i);

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

                                        fm.beginTransaction().replace(R.id.layout_middle, pf)
                                                .addToBackStack(null).commit();

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
                                layoutBoard.addView(linearLayout);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                            getActivity().runOnUiThread(() -> {
                                Toast.makeText(getContext(), "서비스 통신 상태가 좋지 않습니다.", Toast.LENGTH_SHORT).show();
                            });
                        }
                    });
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();

        return layout;
    }

}
