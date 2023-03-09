/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    jest: {
      setupTimeout: 300000
    }
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/myapp.app',
      build: 'xcodebuild -workspace ios/myapp.xcworkspace -scheme myapp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/myapp.app',
      build: 'xcodebuild -workspace ios/myapp.xcworkspace -scheme myapp -configuration Release -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android ; ./gradlew assembleDebug ; ./gradlew assembleAndroidTest -DtestBuildType=debug ; cd -',
      reversePorts: [
        8081
      ]
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      testBinaryPath: 'android/app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk',
      build: 'cd android ; ./gradlew assembleRelease ; ./gradlew assembleAndroidTest -DtestBuildType=release ; cd -'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 8'
      }
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: 'ZF5233V9VF'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_3_API_31'
      }
    }
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'android.att.debug': {
      device: 'attached',
      app: 'android.debug'
    },
    'android.att.release': {
      device: 'attached',
      app: 'android.release'
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release'
    }
  }
};
