import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyC5lGMiFlJGvRjcfEr96sIIC0IIMGGw2Po",
  authDomain: "amznevergiveup.firebaseapp.com",
  projectId: "amznevergiveup",
  storageBucket: "amznevergiveup.appspot.com",
  messagingSenderId: "761073467261",
  appId: "1:761073467261:web:d0b880163569be02185614"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export  const db = getFirestore(app)