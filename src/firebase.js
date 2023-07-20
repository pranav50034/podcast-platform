// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"
  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyDLz6pbq3z1bgwB7b3DRViGeN2azWqiA38",
   authDomain: "podcast-app-react-53ec5.firebaseapp.com",
   projectId: "podcast-app-react-53ec5",
   storageBucket: "podcast-app-react-53ec5.appspot.com",
   messagingSenderId: "1093344077882",
   appId: "1:1093344077882:web:0f294a8c41b856eba0ed03",
   measurementId: "G-SN4HM2CHNN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {auth, db, storage};
