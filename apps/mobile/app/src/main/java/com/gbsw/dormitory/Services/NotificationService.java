package com.gbsw.dormitory.Services;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.gbsw.dormitory.Activities.MainActivity;
import com.gbsw.dormitory.R;

import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;

public class NotificationService extends Service {
    private boolean isRunning = false;

    public static Intent service = null;
    // Main context
    public static Context ctx = null;

    private JSONArray jsonArray = null;

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent == null)// Service removed
            return START_STICKY;

        isRunning = true;
        service = intent;

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            String channel_id = "default";
            NotificationChannel ch = new NotificationChannel(channel_id, "default", NotificationManager.IMPORTANCE_HIGH);
            ((NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE)).createNotificationChannel(ch);

            NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "default");
            builder.setSmallIcon(R.mipmap.logo);
            Notification notify = builder.build();
            startForeground(9, notify);
        }

        new Thread(() -> {
            while (isRunning) {
                try {
                    JSONObject json = new JSONObject(Jsoup.connect("https://drm.gbsw.hs.kr/api/community/get/posts?limit=5&offset=0&type=공지")
                            .ignoreContentType(true)
                            .get().body().html());
                    JSONArray array = json.getJSONArray("posts");

                    if (jsonArray != null) {
                        if (!jsonArray.toString().equals(array.toString()) && jsonArray.length() <= array.length()) { // if different

                            Intent intent2 = new Intent(this, MainActivity.class);
                            intent2.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

                            PendingIntent pendingIntent = PendingIntent.getActivity(this, 0 , intent2, PendingIntent.FLAG_MUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);

                            NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "default");
                            builder.setSmallIcon(R.mipmap.logo);
                            builder.setContentTitle("경소고 정심관");
                            builder.setContentText("기숙사 알림이 도착했습니다. 클릭하여 확인하세요!");
                            builder.setPriority(NotificationCompat.PRIORITY_DEFAULT);
                            builder.setContentIntent(pendingIntent);
                            Notification notify = builder.build();

                            NotificationManager notificationManager = (NotificationManager) this.getSystemService(Context.NOTIFICATION_SERVICE);
                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
                                notificationManager.createNotificationChannel(new NotificationChannel("default", "기본 채널", NotificationManager.IMPORTANCE_DEFAULT));

                            notificationManager.notify(1, notify);
                        }
                    }

                    jsonArray = array;

                    Thread.sleep(3000);
                } catch (Exception e) {}
            }
        }).start();

        return super.onStartCommand(intent, flags, startId);
    }
}
