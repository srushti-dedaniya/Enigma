import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getMessaging, Messaging, isSupported } from 'firebase/messaging';
import { getAnalytics, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let messaging: Messaging | null = null;
let analytics: Analytics | null = null;

export function initializeFirebase() {
  if (app) return app;

  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          messaging = getMessaging(app!);
        }
      });

      if (import.meta.env.PROD) {
        analytics = getAnalytics(app);
      }
    }

    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }

  return app;
}

export function getFirebaseApp(): FirebaseApp | null {
  if (!app) initializeFirebase();
  return app;
}

export function getFirebaseAuth(): Auth | null {
  if (!auth) initializeFirebase();
  return auth;
}

export function getFirestoreDb(): Firestore | null {
  if (!db) initializeFirebase();
  return db;
}

export function getFirebaseStorage(): FirebaseStorage | null {
  if (!storage) initializeFirebase();
  return storage;
}

export function getFirebaseMessaging(): Messaging | null {
  return messaging;
}

export function getFirebaseAnalytics(): Analytics | null {
  return analytics;
}

export async function requestNotificationPermission(): Promise<string | null> {
  if (!messaging) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await messaging.getToken({
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      return token;
    }
  } catch (error) {
    console.error('Error getting notification permission:', error);
  }
  return null;
}

export function onMessageListener(callback: (payload: any) => void) {
  if (!messaging) return () => {};

  return messaging.onMessage(callback);
}

export { firebaseConfig };