import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

// Your Firebase configuration from app.config.ts
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || process.env.FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || process.env.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || process.env.FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId || process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.firebaseAppId || process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);

export default { app, db };