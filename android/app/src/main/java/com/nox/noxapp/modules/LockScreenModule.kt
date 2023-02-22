package com.nox.noxapp.modules

import android.app.AlertDialog
import android.app.KeyguardManager
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.os.Build
import android.provider.Settings
import android.view.WindowManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class LockScreenModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "LockScreenModule"

    @ReactMethod
    fun wakeUpAndTurnScreenOn() { // not used after all, have to do it natively
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
            currentActivity?.setShowWhenLocked(true)
            currentActivity?.setTurnScreenOn(true)
            val keyguardManager =
                currentActivity?.getSystemService(Context.KEYGUARD_SERVICE) as KeyguardManager
            keyguardManager.requestDismissKeyguard(currentActivity!!, null)
        } else {
            currentActivity?.window?.addFlags(
                WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD or WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
            )
        }
    }

    @ReactMethod
    fun checkCanDrawOverlaysPermission(
        promise: Promise
    ) {
        if (canDrawOverlays()) {
            promise.resolve("PERMISSION_GRANTED")
        } else {
            promise.resolve("PERMISSION_NOT_GRANTED")
        }
    }

    @ReactMethod
    fun sendUserToDrawOverlaySettings() {
        val myIntent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION)
        currentActivity?.startActivity(myIntent)
    }

    @ReactMethod
    fun showDialogToSendUserToDrawOverlaySettings(
        message: String,
        positiveButton: String,
        negativeButton: String,
        promise: Promise
    ) {
        // in APIs < 23 this permission is granted by default, so no need to check or change the settings
        if (Build.VERSION.SDK_INT >= 23 && !Settings.canDrawOverlays(currentActivity)) {
            // send user to the device settings
            val positiveButtonListener = DialogInterface.OnClickListener { _, _ ->
                sendUserToDrawOverlaySettings()
                promise.resolve("USER_CLICKED_GO_TO_SETTINGS")
            }

            val negativeButtonListener = DialogInterface.OnClickListener { _, _ ->
                promise.resolve("USER_CLICKED_CANCEL")
            }
            showDialogOverlayPermission(
                message,
                positiveButton,
                negativeButton,
                positiveButtonListener,
                negativeButtonListener
            )
        } else {
            promise.resolve("PERMISSION_ALREADY_GRANTED")
        }
    }

    private fun showDialogOverlayPermission(
        message: String,
        positiveButton: String,
        negativeButton: String,
        positiveButtonListener: DialogInterface.OnClickListener,
        negativeButtonListener: DialogInterface.OnClickListener,
    ) {
        AlertDialog.Builder(currentActivity)
            .setMessage(message)
            .setPositiveButton(positiveButton, positiveButtonListener)
            .setNegativeButton(negativeButton, negativeButtonListener)
            .create()
            .show()
    }

    private fun canDrawOverlays(): Boolean {
        // in APIs < 23 this permission is granted by default, so no need to check or change the settings
        return Build.VERSION.SDK_INT < 23 || Settings.canDrawOverlays(currentActivity)
    }

    companion object {
        private const val TAG: String = "LockScreenModule"
    }
}