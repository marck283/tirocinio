import express, { json, urlencoded } from 'express';
import imageCreationCall from './imageCreationCall.mjs';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/**
 * Configure Express.js parsing middleware
 */
app.use(json({limit: '200mb'}));
app.use(urlencoded({ extended: true }));
 
app.use(cookieParser());
app.use(cors());
app.disable('x-powered-by'); //Disabling x-powered-by for security reasons

/**
 * Serve front-end static files
 */
app.use('/', express.static('public'));

app.use("/ImageCreation", imageCreationCall);

/* Default 404 handler */
app.use((req, res) => {
    console.log("NOT FOUND");
    res.status(404).json({ error: 'Non Trovato' }).send();
    return;
});

export default app;