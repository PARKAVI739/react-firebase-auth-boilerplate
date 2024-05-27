import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHKQD6WYz_eb-rYm_EFlxo8ggOUDsX2dI",
  authDomain: "my-first-firebase-projec-e93ee.firebaseapp.com",
  projectId: "my-first-firebase-projec-e93ee",
  storageBucket: "my-first-firebase-projec-e93ee.appspot.com",
  messagingSenderId: "794295013271",
  appId: "1:794295013271:web:ae7ff9e4ee8d61b9b87ed2",
  measurementId: "G-JMPW7G0M4R"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
