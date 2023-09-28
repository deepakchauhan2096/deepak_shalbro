import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQhCkCZoyDXAoe4FZcSlbbtXRPMz-PKug",
  authDomain: "shalbro.firebaseapp.com",
  projectId: "shalbro",
  storageBucket: "shalbro.appspot.com",
  messagingSenderId: "197806419111",
  appId: "1:197806419111:web:7d7e9b449ac133e86dbf82",
  measurementId: "G-7C8E09TFNV"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
