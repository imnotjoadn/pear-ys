import { combineReducers } from "redux";
import pairs from "./pairs";
import activePair from "./activePair";
import app from "./app";
import {
  firebaseReducer
} from 'react-redux-firebase';


const rootReducer = combineReducers({ pairs, activePair, app, firebaseReducer });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
