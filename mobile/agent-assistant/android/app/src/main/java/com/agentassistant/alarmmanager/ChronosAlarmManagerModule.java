package com.agentassistant.alarmmanager;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.widget.Toast;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.PowerManager;
import android.app.AlarmManager;

public class ChronosAlarmManagerModule extends ReactContextBaseJavaModule  {

    ChronosAlarm alarm = new ChronosAlarm();

    public ChronosAlarmManagerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ChronosAlarmManager";
    }

    @ReactMethod
    public void setAlarm(String datestring){
      alarm.setAlarm(getReactApplicationContext(),datestring);
    }
}
