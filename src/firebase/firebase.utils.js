import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAalC-2bqKbMeyKlDwJ8FeIIJkESvf1njE",
  authDomain: "crwn-db-d9e93.firebaseapp.com",
  databaseURL: "https://crwn-db-d9e93.firebaseio.com",
  projectId: "crwn-db-d9e93",
  storageBucket: "crwn-db-d9e93.appspot.com",
  messagingSenderId: "456034892542",
  appId: "1:456034892542:web:1f6afcd6d0355f007143af",
  measurementId: "G-TMEY5NXD36"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/$/{userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.error(error);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
