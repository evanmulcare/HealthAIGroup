import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyDUK10SmZmvitwc5wNyHdyrcu6Zri4IsqI",
  authDomain: "healthai-2deb8.firebaseapp.com",
  projectId: "healthai-2deb8",
  storageBucket: "healthai-2deb8.appspot.com",
  messagingSenderId: "681155560147",
  appId: "1:681155560147:web:8d88dedcf53e38bf424a26"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
