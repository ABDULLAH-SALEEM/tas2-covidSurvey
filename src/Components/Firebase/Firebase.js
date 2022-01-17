import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCBGJrszuXaPQ09Tg5bcu4biSUUDSeMxdQ",
    authDomain: "covid-survey-35db3.firebaseapp.com",
    projectId: "covid-survey-35db3",
    storageBucket: "covid-survey-35db3.appspot.com",
    messagingSenderId: "533663750720",
    appId: "1:533663750720:web:0042aba757f8bfd9655da5",
    measurementId: "G-JL0X03ZXEN"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);

export {firebaseConfig,auth,db};
