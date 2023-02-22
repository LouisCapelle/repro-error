package com.nox.noxapp.modules

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.nox.noxapp.Constants.BUNDLE_KEY_LAUNCH_SCREEN
import com.nox.noxapp.Constants.BUNDLE_VALUE_LAUNCH_SCREEN_ALARM_CLOCK_EDIT
import com.nox.noxapp.Constants.BUNDLE_VALUE_LAUNCH_SCREEN_ALARM_CLOCK_RING
import com.nox.noxapp.MainActivity
import java.time.Instant
import java.util.*


class AlarmClockModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val activityEventListener =
        object : BaseActivityEventListener() {

            override fun onNewIntent(intent: Intent?) {
                super.onNewIntent(intent)
                val bundle = intent?.extras
                val launchScreen =
                    if (bundle != null && bundle.containsKey(BUNDLE_KEY_LAUNCH_SCREEN)) bundle.getString(
                        BUNDLE_KEY_LAUNCH_SCREEN
                    ) else null

                if (launchScreen == BUNDLE_VALUE_LAUNCH_SCREEN_ALARM_CLOCK_RING) {
                    val openAlarmActivityIntent = Intent(currentActivity, MainActivity::class.java)
                    openAlarmActivityIntent.putExtra(
                        BUNDLE_KEY_LAUNCH_SCREEN,
                        BUNDLE_VALUE_LAUNCH_SCREEN_ALARM_CLOCK_RING
                    )
                    currentActivity?.finish() // this is the only way to make it show again on top of lock screen
                    currentActivity?.startActivity(intent)
                }
            }
        }

    init {
        reactContext.addActivityEventListener(activityEventListener)
    }

    override fun getName() = "AlarmClockModule"

    @ReactMethod
    fun cancelAlarmClock() {
        val alarmManager = currentActivity?.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        alarmManager.cancel(
            createOpenActivityPendingIntent(
                MainActivity::class.java,
                BUNDLE_VALUE_LAUNCH_SCREEN_ALARM_CLOCK_RING
            )
        )
    }

    @ReactMethod
    fun setAlarmClock(dateAsString: String) {
        cancelAlarmClock() // only allow one alarm clock -- if we need more this needs to change
        val timeAsDate = parseStringToDate(dateAsString)
        if (timeAsDate != null) {
            val c = getCalendarInstance(timeAsDate)
            val alarmManager =
                currentActivity?.getSystemService(Context.ALARM_SERVICE) as AlarmManager
            val alarmClockInfo = AlarmManager.AlarmClockInfo(
                c.timeInMillis,
                createOpenActivityPendingIntent(
                    MainActivity::class.java,
                    BUNDLE_VALUE_LAUNCH_SCREEN_ALARM_CLOCK_EDIT
                )
            )
            alarmManager.setAlarmClock(
                alarmClockInfo,
                createOpenActivityPendingIntent(
                    MainActivity::class.java,
                    BUNDLE_VALUE_LAUNCH_SCREEN_ALARM_CLOCK_RING
                )
            )
        }
    }


    private fun createOpenActivityPendingIntent(
        cls: Class<*>,
        launchScreen: String
    ): PendingIntent? {
        val openAlarmActivityIntent = Intent(currentActivity, cls)
        openAlarmActivityIntent.putExtra(BUNDLE_KEY_LAUNCH_SCREEN, launchScreen)
        return PendingIntent.getActivity(
            currentActivity,
            1,
            openAlarmActivityIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
    }

    private fun getCalendarInstance(timeAsDate: Date?): Calendar {
        val c = Calendar.getInstance()
        if (timeAsDate != null) {
            c.time = timeAsDate
        }
        return c
    }

    private fun parseStringToDate(dateAsString: String?): Date? {
        return if (dateAsString === null) null else Date.from(
            Instant.parse(
                dateAsString
            )
        )
    }

    companion object {
        private const val TAG: String = "AlarmClockModule"
    }
}