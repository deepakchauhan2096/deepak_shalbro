import {initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBQhCkCZoyDXAoe4FZcSlbbtXRPMz-PKug",
  authDomain: "shalbro.firebaseapp.com",
  projectId: "shalbro",
  storageBucket: "shalbro.appspot.com",
  messagingSenderId: "197806419111",
  appId: "1:197806419111:web:7d7e9b449ac133e86dbf82",
  measurementId: "G-7C8E09TFNV",
  databaseURL : "https://console.firebase.google.com/project/shalbro/database/shalbro-default-rtdb/data/~2F"
};
console.log(firebaseConfig);



const app = initializeApp(firebaseConfig);

const auth = getAuth();

const firestore = getFirestore(app);

export { app, auth, firestore };