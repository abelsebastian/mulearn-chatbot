import { initializeApp } from "firebase/app"
import { initializeFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAqk1If2mFde4qMKXj0HoZ4nOobupwE_1g",
  authDomain: "mulearn-chatbot.firebaseapp.com",
  projectId: "mulearn-chatbot",
  storageBucket: "mulearn-chatbot.firebasestorage.app",
  messagingSenderId: "856262783189",
  appId: "1:856262783189:web:f637110db0bc02427e725c",
  measurementId: "G-X7ZT1S12P5"
};

const app = initializeApp(firebaseConfig)

// force long-polling so ad-blockers / extensions don't kill the stream
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
})
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
