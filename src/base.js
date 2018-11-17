import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAaZeFpgqHnxoujPT5nZrR3p1BwsxWeReY",
  authDomain: "catch-of-the-day-adrian-c.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-adrian-c.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

// default export
export default base;
