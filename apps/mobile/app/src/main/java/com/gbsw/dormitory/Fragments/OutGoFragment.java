package com.gbsw.dormitory.Fragments;

import android.content.SharedPreferences;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.fragment.app.Fragment;

import com.gbsw.dormitory.R;

import org.json.JSONObject;
import org.jsoup.Jsoup;

import java.util.concurrent.atomic.AtomicInteger;

public class OutGoFragment extends Fragment {
    private SharedPreferences pref;

    private Button button_friday;
    private Button button_saturday;
    private Button button_sunday;

    private EditText reason;

    private Button button_am;
    private Button button_pm;
    private Button button_allday;
    private Button button_sleepover;

    private Button button_submit;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup viewGroup, Bundle savedInstanceState) {
        LinearLayout layout = (LinearLayout) inflater.inflate(R.layout.fragment_outgo, viewGroup, false);

        pref = PreferenceManager.getDefaultSharedPreferences(getActivity());

        AtomicInteger day = new AtomicInteger(-1);
        AtomicInteger time = new AtomicInteger(-1);

        Runnable setColorDefaultWeek = () -> {
            button_friday.getBackground().setTintList(ColorStateList.valueOf(Color.parseColor("#787878")));
            button_saturday.getBackground().setTintList(ColorStateList.valueOf(Color.parseColor("#787878")));
            button_sunday.getBackground().setTintList(ColorStateList.valueOf(Color.parseColor("#787878")));
        };

        Runnable setColorDefaultType = () -> {
            button_am.getBackground().setTintList(ColorStateList.valueOf(Color.parseColor("#787878")));
            button_pm.getBackground().setTintList(ColorStateList.valueOf(Color.parseColor("#787878")));
            button_allday.getBackground().setTintList(ColorStateList.valueOf(Color.parseColor("#787878")));
            button_sleepover.getBackground().setTintList(ColorStateList.valueOf(Color.parseColor("#787878")));
        };

        button_friday = layout.findViewById(R.id.btn_friday);
        button_friday.setOnClickListener(e -> {
            setColorDefaultWeek.run();
            button_friday.getBackground().setTintList(ColorStateList.valueOf(Color.parseColor("#4272FF")));
            day.set(0);
        });

        button_saturday = layout.findViewById(R.id.btn_saturday);
        button_saturday.setOnClickListener(e -> {
            setColorDefaultWeek.run();
            button_saturday.getBackground().setTintList(ColorStateList.valueOf(Color.parseColor("#4272FF")));
            day.set(1);
        });

        button_sunday = layout.findViewById(R.id.btn_sunday);
        button_sunday.setOnClickListener(e -> {
            setColorDefaultWeek.run();
            button_sunday.getBackground().setTintList(ColorStateList.valueOf(Color.parseColor("#4272FF")));
            day.set(2);
        });

        reason = layout.findViewById(R.id.edittext_reason);

        button_am = layout.findViewById(R.id.btn_am);
        button_am.setOnClickListener(e -> {
            setColorDefaultType.run();
            button_am.getBackground().setTintList(ColorStateList.valueOf(Color.parseColor("#4272FF")));
            time.set(0);
        });

        button_pm = layout.findViewById(R.id.btn_pm);
        button_pm.setOnClickListener(e -> {
            setColorDefaultType.run();
            button_pm.getBackground().setTintList(ColorStateList.valueOf(Color.parseColor("#4272FF")));
            time.set(1);
        });

        button_allday = layout.findViewById(R.id.btn_allday);
        button_allday.setOnClickListener(e -> {
            setColorDefaultType.run();
            button_allday.getBackground().setTintList(ColorStateList.valueOf(Color.parseColor("#4272FF")));
            time.set(2);
        });

        button_sleepover = layout.findViewById(R.id.btn_sleepover);
        button_sleepover.setOnClickListener(e -> {
            setColorDefaultType.run();
            button_sleepover.getBackground().setTintList(ColorStateList.valueOf(Color.parseColor("#4272FF")));
            time.set(3);
        });

        button_submit = layout.findViewById(R.id.btn_submit);
        button_submit.setOnClickListener(e -> {
            if (day.get() == -1) {
                Toast.makeText(getContext(), "요일을 정해주세요.", Toast.LENGTH_SHORT).show();
                return;
            }

            if (time.get() == -1) {
                Toast.makeText(getContext(), "외출/외박 종류를 정해주세요.", Toast.LENGTH_SHORT).show();
                return;
            }

            if (day.get() == 0) {
                if (time.get() != 3) {
                    Toast.makeText(getContext(), "금요일은 외박만 가능합니다.", Toast.LENGTH_SHORT).show();
                    return;
                }
            }

            if (day.get() == 1) {
                if (time.get() == 0 || time.get() == 2) {
                    Toast.makeText(getContext(), "토요일은 오전 외출이 불가능합니다.", Toast.LENGTH_SHORT).show();
                    return;
                }
            }

            if (day.get() == 2) {
                if (time.get() == 3) {
                    Toast.makeText(getContext(), "일요일은 외박이 불가능합니다.", Toast.LENGTH_SHORT).show();
                    return;
                }
            }

            // TODO
            new Thread(() -> {
                try {
                    String[] week = {"금", "토", "일"};
                    String[] types = {"오전외출", "오후외출", "외출", "외박"};

                    JSONObject json = new JSONObject();
                    json.put("dotw", week[day.get()]);
                    json.put("type", types[time.get()]);
                    json.put("reason", reason.getText());

                    JSONObject _res = new JSONObject(Jsoup.connect("https://drm.gbsw.hs.kr/api/outgo/set")
                            .ignoreContentType(true)
                            .header("Authorization", "Bearer " + pref.getString("token", ""))
                            .header("Content-Type", "application/json")
                            .requestBody(json.toString())
                            .post().body().html());
                    
                    getActivity().runOnUiThread(() -> {
                        Toast.makeText(getActivity(), "외출 / 외박 신청이 완료되었습니다.", Toast.LENGTH_SHORT).show();
                    });
                } catch (Exception e1) {
                    e1.printStackTrace();
                    getActivity().runOnUiThread(() -> {
                        Toast.makeText(getActivity(), "서비스 통신 상태가 좋지 않습니다.", Toast.LENGTH_SHORT).show();
                    });
                }
            }).start();
        });

        return layout;
    }

}
