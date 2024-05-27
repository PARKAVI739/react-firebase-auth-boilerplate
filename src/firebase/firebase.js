import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "enter key",
  authDomain: "enter authdomain",
  projectId: "enter ur credential",
  storageBucket: "enter ur credential",
  messagingSenderId: "enter ur credential",
  appId: "enter ur credential",
  measurementId: "enter ur credential"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
