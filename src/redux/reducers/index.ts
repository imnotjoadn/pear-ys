import { combineReducers } from "redux";

import { firestoreReducer as firestore } from 'redux-firestore';
import { firebaseReducer as firebase, FirebaseReducer, FirestoreReducer } from 'react-redux-firebase';

import pairs from "./pairs";
import activePair from "./activePair";
import app from "./app";
import { Pair } from "../../lib/pair";

interface UserProfile {
  email: string
}

// create schema for the DB
interface DBSchema {
  comparisons: Pair
  [name: string]: any
}

export interface RootState {
  firebase: FirebaseReducer.Reducer<UserProfile, DBSchema>;
  firestore?: any; // Todo: why not FirestoreReducer.Reducer
  pairs?: ReturnType<typeof pairs>;
  app?: ReturnType<typeof app>;
  activePair?: ReturnType<typeof activePair>;  
}

const rootReducer = combineReducers<RootState>({
  pairs, activePair, app, firestore, firebase
})

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>
