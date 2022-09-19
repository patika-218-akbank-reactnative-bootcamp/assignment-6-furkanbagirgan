import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4TRX35CWCe8Zx2MWNpmWlnJUF2h40u_8",
  authDomain: "snapchat-example.firebaseapp.com",
  projectId: "snapchat-example",
  storageBucket: "snapchat-example.appspot.com",
  messagingSenderId: "317758882929",
  appId: "1:317758882929:web:7d7312cc4c937e5c56c7d0"
};

//Initialize firebase, auth, database and storage
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);