import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8ttvi_eHRVQcgheBT7alqdBfrJr4Zscs",
  authDomain: "forsure-4a783.firebaseapp.com",
  databaseURL: "https://forsure-4a783-default-rtdb.firebaseio.com",
  projectId: "forsure-4a783",
  storageBucket: "forsure-4a783.appspot.com",
  messagingSenderId: "38610963541",
  appId: "1:38610963541:web:d65643be282854655598dc",
  measurementId: "G-TL35HCQTC8"
};

export const app = initializeApp(firebaseConfig);
// export const db = getDatabase(app);


