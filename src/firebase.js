import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsQt-NLH47wpgUHMJFOJBGz6YMweNcHAw",
  authDomain: "linkedin-clone-838ac.firebaseapp.com",
  projectId: "linkedin-clone-838ac",
  storageBucket: "linkedin-clone-838ac.appspot.com",
  messagingSenderId: "380565691520",
  appId: "1:380565691520:web:f18614137fe8111cc45a65",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
