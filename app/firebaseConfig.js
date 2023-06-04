import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJTihhGsmR4e7zeHg1M3MhuWymzvt0wlo",
  authDomain: "fintracker-51cdf.firebaseapp.com",
  projectId: "fintracker-51cdf",
  storageBucket: "fintracker-51cdf.appspot.com",
  messagingSenderId: "92100192083",
  appId: "1:92100192083:web:2f73966231df305f8c63a6",
  measurementId: "G-78NVS3PNMR",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
