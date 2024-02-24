import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3qNLE6eALeSCwCVx7wy_0ZxQNINzg2SU",
  authDomain: "webchatapp2-75b19.firebaseapp.com",
  projectId: "webchatapp2-75b19",
  storageBucket: "webchatapp2-75b19.appspot.com",
  messagingSenderId: "394361516120",
  appId: "1:394361516120:web:7d932fa6640558464eda2d",
  measurementId: "G-0L638E4PCM"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


