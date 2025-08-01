import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_kZ1TxNkvbG50g3ype_gVVT2SBuUHxw8",
  authDomain: "porfolio-websites.firebaseapp.com",
  projectId: "porfolio-websites",
  storageBucket: "porfolio-websites.firebasestorage.app",
  messagingSenderId: "65333025759",
  appId: "1:65333025759:web:6832e637f33cf95c4f026a",
  measurementId: "G-B2CVRXZ513"
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };