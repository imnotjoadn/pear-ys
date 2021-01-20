import * as firebase from 'firebase/app'; // no relative path =  get from node modu

import 'firebase/database'; // Realtime Database, NoSQl. e.g. sharing a state between multiple clients that is kept in sync
import 'firebase/firestore'; // NoSQL, just send objects
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDzbwCsZNmBPdsAIG-isIzOzoIrGbNhwPg",
    authDomain: "pearys-88fd5.firebaseapp.com",
    projectId: "pearys-88fd5",
    storageBucket: "pearys-88fd5.appspot.com",
    messagingSenderId: "435876797912",
    appId: "1:435876797912:web:407a0e054f7f35815666ad",
    measurementId: "G-K551F6JG2J"
  };

export interface FirebaseUser extends firebase.User {

}

// Firebase Service singleton
export class Firebase {

    private db: firebase.firestore.Firestore;
    
    private googleAuthProvider: firebase.auth.GoogleAuthProvider;

    constructor() {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
        this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    }

    async initialize(callback: (user: FirebaseUser | null) => void) {
        firebase.auth().onAuthStateChanged((user) => {
            callback(user);
        });
    }

    // https://firebase.google.com/docs/auth/web/anonymous-auth

    private async signIn(userCredentialResult: firebase.auth.UserCredential): Promise<FirebaseUser | null> {
        try {
            console.log("signing in");
            const oauthcredential = userCredentialResult.credential as (firebase.auth.OAuthCredential | null);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = oauthcredential?.accessToken;
            // The signed-in user info.
            const user = userCredentialResult.user;
            // Store token in local storage.
            localStorage.setItem("🔑", token ?? '');
            console.log("sign in complete");
            return user as FirebaseUser;
        } catch (error) {
            console.log("sign in error" + error);
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
        }
        return null;
    }

    async signInWithGoogle(): Promise<FirebaseUser | null> {
        const userCredentialResult = await firebase.auth().signInWithPopup(this.googleAuthProvider);
        return await this.signIn(userCredentialResult);
    }

    async signInAnonymously(): Promise<FirebaseUser | null> {
        const userCredentialResult = await firebase.auth().signInAnonymously();
        return await this.signIn(userCredentialResult);
    }

    async signOut() {
        try {
            firebase.auth().signOut();
        } catch (error) {
            // An error happened.
        }                 
    }
}
