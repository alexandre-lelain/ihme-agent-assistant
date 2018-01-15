package com.agentassistant.alarmmanager;

import java.text.SimpleDateFormat;
import java.util.Date;

//import android.app.NotificationManager;
//import android.support.v4.app.NotificationCompat.Builder;
import android.widget.Toast;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.PowerManager;
import android.app.AlarmManager;

public class ChronosAlarm extends BroadcastReceiver  {

    @Override
    public void onReceive(Context context, Intent intent){
        PowerManager pm = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
        PowerManager.WakeLock wl = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "");
        wl.acquire();
        /*NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(this)
                    .setContentTitle("My notification")
                    .setContentText("Hello World!");
                    int mNotificationId = 001;
        // Gets an instance of the NotificationManager service
        NotificationManager mNotifyMgr = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        // Builds the notification and issues it.
        mNotifyMgr.notify(mNotificationId, mBuilder.build());*/
        Toast.makeText(context, "Alarm !!!!!!!!!!", Toast.LENGTH_LONG).show();
        wl.release();
    }

    public void setAlarm(Context context,String datestring){
      //Toast.makeText(context, "hello world!", 5000).show();
      long time = System.currentTimeMillis();
      SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy hh:mm");
      try{
        Date date = sdf.parse(datestring);
        time = date.getTime();
      }catch (Exception e) {
        Toast.makeText(context,e.toString(), 100000).show();
      }
      AlarmManager am = (AlarmManager)context.getSystemService(Context.ALARM_SERVICE);
      Intent i = new Intent(context, ChronosAlarm.class);
      PendingIntent pi = PendingIntent.getBroadcast(context, 0, i, 0);
      //am.setRepeating(AlarmManager.RTC_WAKEUP, System.currentTimeMillis(), 1000 * 20, pi); // Millisec * Second * Minute
      am.set(AlarmManager.RTC_WAKEUP, time,pi); // Millisec * Second * Minute
    }
}
