import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBQIZ7gnJaHFSNOsJ62BfWaReGKdjGknK4",
  authDomain: "jawerly-store-768cb.firebaseapp.com",
  projectId: "jawerly-store-768cb",
  storageBucket: "jawerly-store-768cb.appspot.com",
  messagingSenderId: "376609692671",
  appId: "1:376609692671:web:960614e7c19f126ad6e5ca",
  measurementId: "G-50XKXPEQ55",

};
export const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)