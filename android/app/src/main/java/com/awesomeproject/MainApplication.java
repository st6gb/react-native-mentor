package com.awesomeproject;

import android.app.Application;

import com.toast.RCTToastPackage;
import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.airbnb.android.react.lottie.LottiePackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.urbanairship.reactnative.ReactAirshipPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new RNDeviceInfo(),
            new LottiePackage(), new SplashScreenReactPackage(), new NetInfoPackage(),
          new ReactAirshipPackage(), new AsyncStoragePackage(), new VectorIconsPackage(), new RNGestureHandlerPackage(),
          new RCTToastPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
