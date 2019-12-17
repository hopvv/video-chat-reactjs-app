import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCtctKoZYK3zZ5kbOXWBWxVrqTmrhWxi9s",
  authDomain: "chat-simple-app.firebaseapp.com",
  databaseURL: "https://chat-simple-app.firebaseio.com",
  projectId: "chat-simple-app",
  storageBucket: "chat-simple-app.appspot.com",
  messagingSenderId: "64435657138",
  appId: "1:64435657138:web:77dcc3c15499da10cf2cab",
  measurementId: "G-E0N3B9S1H6"
};

firebase.initializeApp(config);
firebase.firestore().settings({
  // timestampsInSnapshots: true
});

export const myFirebase = firebase;
export const myFirestore = firebase.firestore();
export const myStorage = firebase.storage();

/**
 * Firebase auto save user data on local storage
 */