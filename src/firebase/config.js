// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

// Your web app's Firebase configuration
// Dev/Prod
/* const firebaseConfig = {
  apiKey: "AIzaSyBfySs6kcLW3MskVN-uFDpxcOnacHhD0HY",
  authDomain: "journal-app-f73ff.firebaseapp.com",
  projectId: "journal-app-f73ff",
  storageBucket: "journal-app-f73ff.appspot.com",
  messagingSenderId: "809111407010",
  appId: "1:809111407010:web:0a2bd5317364ee3aefcafb"
}; */

// Testing
/* const firebaseConfig = {
  apiKey: "AIzaSyBhFopse1_tuxt8F_k6aMs7XbrGIllnSMk",
  authDomain: "journal-app-prueba.firebaseapp.com",
  projectId: "journal-app-prueba",
  storageBucket: "journal-app-prueba.appspot.com",
  messagingSenderId: "357236456722",
  appId: "1:357236456722:web:0b4f119172abea15a707cb"
}; */

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// Initialize Firebase
export const firebaseApp = initializeApp( firebaseConfig );
export const firebaseAuth = getAuth( firebaseApp );
export const firebaseDB = getFirestore( firebaseApp );