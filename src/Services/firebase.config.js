import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBOZOx4HabE2j2Gg0fBaTcMb3BXc8Pc558",
  authDomain: "react-task-baf50.firebaseapp.com",
  projectId: "react-task-baf50",
  storageBucket: "react-task-baf50.appspot.com",
  messagingSenderId: "855862219057",
  appId: "1:855862219057:web:8ab6f351b41bdb5b472010",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
