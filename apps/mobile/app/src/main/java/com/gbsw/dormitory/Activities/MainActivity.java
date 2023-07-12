package com.gbsw.dormitory.Activities;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.PowerManager;
import android.preference.PreferenceManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.gbsw.dormitory.Fragments.CommunityFragment;
import com.gbsw.dormitory.Fragments.MainFragment;
import com.gbsw.dormitory.Fragments.OutGoFragment;
import com.gbsw.dormitory.Fragments.PostFragment;
import com.gbsw.dormitory.R;
import com.gbsw.dormitory.Services.NotificationService;
import com.gbsw.dormitory.ShakeDetector;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;
import com.journeyapps.barcodescanner.CaptureActivity;

import org.json.JSONObject;
import org.jsoup.Jsoup;

public class MainActivity extends AppCompatActivity {
    private SharedPreferences preferences;
    private SharedPreferences.Editor editor;

    private LinearLayout btn_home;
    private LinearLayout btn_qr;
    private LinearLayout btn_announce;
    private LinearLayout btn_go_out;
    private FragmentManager fm;

    private Button logout_btn;

    private ImageView hamburger;

    private DrawerLayout drawerLayout;

    private TextView id_name;
    private TextView nickname;
    private TextView school;
    private TextView dormitory;

    private Sensor mAccelerometer;
    private SensorManager mSensorManager;
    private ShakeDetector mShakeDetector;

    @Override
    public void onBackPressed() {
        Fragment fragment = fm.findFragmentById(R.id.layout_middle);

        if (drawerLayout.isOpen())
            drawerLayout.close();
        else {
            if (fragment instanceof PostFragment) {
                PostFragment fragment1 = (PostFragment) fragment;
                if (fragment1.isOpen.get()) {
                    fragment1.closeComment();
                    return;
                }
            }

            if (fm.getBackStackEntryCount() > 1 && fragment != null) {
                fm.beginTransaction().remove(fragment).commit();
                fm.popBackStack();
                return;
            }

            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setMessage("앱을 종료하시겠습니까?")
                    .setPositiveButton("앱 종료", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            finish();
                        }
                    })
                    .setNegativeButton("취소", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            dialog.dismiss();
                        }
                    });
            AlertDialog dialog = builder.create();
            dialog.show();
        }
    }

    private ActivityResultLauncher<Intent> arl = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == 1) { // Success
                    Intent data = result.getData();

                    String nickname = data.getStringExtra("nickname");
                    String userId = data.getStringExtra("userId");
                    String fullname = data.getStringExtra("fullname");
                    String dormitory = data.getStringExtra("dormitory");
                    String school = data.getStringExtra("school");

                    id_name.setText(nickname + "(" + userId + ")");
                    this.nickname.setText("이름: " + fullname);
                    this.school.setText("학년: " + school);
                    this.dormitory.setText("기숙사: " + dormitory);

                    editor.putString("token", data.getStringExtra("token"));
                    editor.putString("id", userId);
                    editor.commit();
                    Toast.makeText(this, "로그인 성공!", Toast.LENGTH_SHORT).show();
                } else if (result.getResultCode() == 2) {
                    Intent data = result.getData();

                    String nickname = data.getStringExtra("nickname");
                    String userId = data.getStringExtra("userId");
                    String fullname = data.getStringExtra("fullname");
                    String dormitory = data.getStringExtra("dormitory");
                    String school = data.getStringExtra("school");

                    id_name.setText(nickname + "(" + userId + ")");
                    this.nickname.setText("이름: " + fullname);
                    this.school.setText("학년: " + school);
                    this.dormitory.setText("기숙사: " + dormitory);

                    Toast.makeText(this, "유저 정보 인증 성공!", Toast.LENGTH_SHORT).show();
                } else { // Error
                    Toast.makeText(this, "서비스 상태가 좋지 않습니다. 나중에 다시 시도해주세요..", Toast.LENGTH_SHORT).show();
                    finish();
                }
            });
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        PowerManager pm = (PowerManager) getApplicationContext().getSystemService(POWER_SERVICE);
        boolean isWhiteListing = false;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M)
            isWhiteListing = pm.isIgnoringBatteryOptimizations(getApplicationContext().getPackageName());
        if (!isWhiteListing) {
            Intent intent = new Intent();
            intent.setAction(android.provider.Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
            intent.setData(Uri.parse("package:" + getApplicationContext().getPackageName()));
            startActivity(intent);
        }

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M)
            isWhiteListing = pm.isIgnoringBatteryOptimizations(getApplicationContext().getPackageName());

        if (!isWhiteListing)
            finish();

        mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        mAccelerometer = mSensorManager
                .getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        mShakeDetector = new ShakeDetector();
        mShakeDetector.setOnShakeListener(new ShakeDetector.OnShakeListener() {
            @Override
            public void onShake(int count) {
                if (count > 1) {
                    IntentIntegrator integrator = new IntentIntegrator(MainActivity.this);
                    integrator.setOrientationLocked(false);
                    integrator.setCaptureActivity(QRActivity.class);
                    integrator.setPrompt("QR코드를 인식시켜주세요.");
                    integrator.initiateScan();
                }
            }
        });

        if (NotificationService.service == null) {
            Intent intent = new Intent(this, NotificationService.class);
            startService(intent);
        }

        preferences = PreferenceManager.getDefaultSharedPreferences(this);
        editor = preferences.edit();

        id_name = findViewById(R.id.id_name);
        nickname = findViewById(R.id.nickname);
        school = findViewById(R.id.school);
        dormitory = findViewById(R.id.dormitory);

        drawerLayout = findViewById(R.id.drawer_layout);

        logout_btn = findViewById(R.id.logout_btn);
        logout_btn.setOnClickListener(e -> {
            editor.remove("token");
            editor.commit();

            Intent i = new Intent(this, PrepareActivity.class);
            i.putExtra("token", "");
            arl.launch(i);
        });

        hamburger = findViewById(R.id.hamburger_bar);
        hamburger.setOnClickListener(e -> {
            drawerLayout.open();
        });

        btn_home = findViewById(R.id.btn_home);
        btn_home.setOnClickListener(e -> {
            fm.beginTransaction().replace(R.id.layout_middle, new MainFragment())
                    .addToBackStack(null).commit();
        });

        btn_qr = findViewById(R.id.btn_qr);
        btn_qr.setOnClickListener(e -> {
            IntentIntegrator integrator = new IntentIntegrator(this);
            integrator.setOrientationLocked(false);
            integrator.setCaptureActivity(QRActivity.class);
            integrator.setPrompt("QR코드를 인식시켜주세요.");
            integrator.initiateScan();
        });

        btn_announce = findViewById(R.id.btn_announce);
        btn_announce.setOnClickListener(e -> {
            fm.beginTransaction().replace(R.id.layout_middle, new CommunityFragment())
                    .addToBackStack(null).commit();
        });;

        btn_go_out = findViewById(R.id.btn_go_out);
        btn_go_out.setOnClickListener(e -> {
            fm.beginTransaction().replace(R.id.layout_middle, new OutGoFragment())
                    .addToBackStack(null).commit();
        });

        Intent i = new Intent(this, PrepareActivity.class);
        i.putExtra("token", preferences.getString("token", ""));
        arl.launch(i);

        fm = getSupportFragmentManager();
        fm.beginTransaction().replace(R.id.layout_middle, new MainFragment())
                .addToBackStack(null).commit();
    }

    // QR
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (data != null) {
            // QR코드 / 바코드를 스캔한 결과
            IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
            if (result != null) {
                try {
                    String content = result.getContents();
                    String type = content.split("_")[0];
                    String code = content.split("_")[1];

                    new Thread(() -> {
                        try {
                            JSONObject json = new JSONObject();
                            json.put("uuid", code);

                            JSONObject _res = new JSONObject(Jsoup.connect("https://drm.gbsw.hs.kr/api/qrcode/access/" + type)
                                    .ignoreContentType(true)
                                    .header("Authorization", "Bearer " + preferences.getString("token", ""))
                                    .header("Content-Type", "application/json")
                                    .requestBody(json.toString())
                                    .post().body().html());

                            runOnUiThread(() -> {
                                Toast.makeText(this, "정상적으로 처리되었습니다.", Toast.LENGTH_SHORT).show();
                            });
                        } catch (Exception e1) {
                            if (e1.getMessage().contains("401")) {
                                runOnUiThread(() -> {
                                    Toast.makeText(this, "외출 신청을 하지 않으셨습니다.", Toast.LENGTH_SHORT).show();
                                });
                                return;
                            }

                            runOnUiThread(() -> {
                                Toast.makeText(this, "정상적인 QR코드가 아닙니다.", Toast.LENGTH_SHORT).show();
                            });
                        }
                    }).start();
                } catch (Exception e) {
                    Toast.makeText(this, "정상적인 QR코드가 아닙니다.", Toast.LENGTH_SHORT).show();
                }
            }
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        mSensorManager.registerListener(mShakeDetector, mAccelerometer,    SensorManager.SENSOR_DELAY_UI);
    }

    @Override
    public void onPause() {
        mSensorManager.unregisterListener(mShakeDetector);
        super.onPause();
    }
}