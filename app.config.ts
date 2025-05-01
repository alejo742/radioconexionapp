import { ExpoConfig, ConfigContext } from 'expo/config';

// Read environment variables
export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: "Radio Conexion",
    slug: "radioconexionapp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.radioconexion.app"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.alejo742.radioconexion"
    },
    web: {
      favicon: "./assets/favicon.png"
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
        projectId: "4c0c924a-2921-4cce-8cfb-d46173e23f21"
      }
    },
    updates: {
        url: "https://u.expo.dev/4c0c924a-2921-4cce-8cfb-d46173e23f21",
        fallbackToCacheTimeout: 0,
    },
    runtimeVersion: "1.0.0",
  };
};