import { ExpoConfig, ConfigContext } from 'expo/config';

// Read environment variables
export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    owner: "radioconexion",
    name: "Radio Conexion",
    slug: "radio-conexion",
    version: "1.1.0",
    orientation: "portrait",
    icon: "./assets/conexion-icon.png",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      icon: "./assets/conexion-icon.png",
      supportsTablet: true,
      bundleIdentifier: "com.alejo742.radioconexion",
      infoPlist: {
        UIBackgroundModes: ["audio"],
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/conexion-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.alejo742.radioconexion",
      permissions: [
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "FOREGROUND_SERVICE",
        "FOREGROUND_SERVICE_MEDIA_PLAYBACK",
        "WAKE_LOCK",
        "REQUEST_IGNORE_BATTERY_OPTIMIZATIONS",
      ]
    },
    androidStatusBar: {
      backgroundColor: "#000000",
    },
    web: {
      favicon: "./assets/conexion-icon.png"
    },
    extra: {
      // Access environment variables that EAS injects during build
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      eas: {
        projectId: "f6dac8eb-fd12-4d6c-a02b-0dea60be87ab"
      }
    },
    updates: {
        url: "https://u.expo.dev/f6dac8eb-fd12-4d6c-a02b-0dea60be87ab",
        fallbackToCacheTimeout: 0,
    },
    runtimeVersion: "1.0.1",
  };
};