package com.nox.noxapp;

import android.app.Activity;
import android.app.KeyguardManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

import java.util.Objects;

import expo.modules.ReactActivityDelegateWrapper;

import static com.nox.noxapp.Constants.BUNDLE_KEY_LAUNCH_SCREEN;
import static com.nox.noxapp.Constants.BUNDLE_VALUE_LAUNCH_SCREEN_ALARM_CLOCK_RING;

public class MainActivity extends ReactActivity {
    private final static String TAG = MainActivity.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Set the theme to AppTheme BEFORE onCreate to support
        // coloring the background, status bar, and navigation bar.
        // This is required for expo-splash-screen.
        setTheme(R.style.AppTheme);
        super.onCreate(null);
        Bundle bundle = getIntent().getExtras();
        String launchScreen = bundle != null && bundle.containsKey(BUNDLE_KEY_LAUNCH_SCREEN) ? bundle.getString(BUNDLE_KEY_LAUNCH_SCREEN) : null;
        if (Objects.equals(launchScreen, BUNDLE_VALUE_LAUNCH_SCREEN_ALARM_CLOCK_RING)) {
            wakeUpAndTurnScreenOn();
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "main";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegateWrapper(this,
                new NoxReactActivityDelegate(this, getMainComponentName())
        );
    }

    /**
     * Align the back button behavior with Android S
     * where moving root activities to background instead of finishing activities.
     *
     * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
     */
    @Override
    public void invokeDefaultOnBackPressed() {
        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
            if (!moveTaskToBack(false)) {
                // For non-root activities, use the default implementation to finish them.
                super.invokeDefaultOnBackPressed();
            }
            return;
        }

        // Use the default back button implementation on Android S
        // because it's doing more than {@link Activity#moveTaskToBack} in fact.
        super.invokeDefaultOnBackPressed();
    }

    private void wakeUpAndTurnScreenOn() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
            setShowWhenLocked(true);
            setTurnScreenOn(true);
            KeyguardManager keyguardManager = (KeyguardManager) getSystemService(Context.KEYGUARD_SERVICE);
            keyguardManager.requestDismissKeyguard(this, null);
        } else {
            getWindow().addFlags(
                    WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD | WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
            );
        }
    }

    public static class NoxReactActivityDelegate extends ReactActivityDelegate {
        private final Activity mActivity;

        public NoxReactActivityDelegate(Activity activity, String mainComponentName) {
            super(activity, mainComponentName);
            this.mActivity = activity;
        }

        @Override
        protected Bundle getLaunchOptions() {
            Bundle initialProps = new Bundle();
            Intent intent = mActivity == null ? null : mActivity.getIntent();
            if (intent != null) {
                Bundle bundle = mActivity.getIntent().getExtras();
                if (bundle != null && bundle.containsKey(BUNDLE_KEY_LAUNCH_SCREEN)) {
                    initialProps.putString(BUNDLE_KEY_LAUNCH_SCREEN, bundle.getString(BUNDLE_KEY_LAUNCH_SCREEN));
                }
            }
            return initialProps;
        }
    }
}
