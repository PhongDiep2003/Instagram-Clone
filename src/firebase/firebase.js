
import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEgCUi-XqD-J_8XN2ZBBbDNP24XO9iABE",
  authDomain: "instagramclone-603ff.firebaseapp.com",
  projectId: "instagramclone-603ff",
  storageBucket: "instagramclone-603ff.appspot.com",
  messagingSenderId: "411240774415",
  appId: "1:411240774415:web:f6a8afb6b4806068485c7a"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = initializeAuth(firebase)
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)
export {firebase, auth, firestore, storage};