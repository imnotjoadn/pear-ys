import { Pair } from '../lib/pair';
import { FirebaseUser } from '../services/firebase';
import {SET_DARKMODE, SetDarkModeAction, SET_USER, SetUserAction, SetActivePairAction, SET_ACTIVEPAIR} from './actionTypes';

export function setDarkMode (darkMode: boolean): SetDarkModeAction {
  return {
    type: SET_DARKMODE,
    darkMode
  }
}

export function setUser(user: FirebaseUser | null): SetUserAction {
  return {
    type: SET_USER,
    user
  }
}

export function setActivePair(pair: Pair): SetActivePairAction {
  return {
    type: SET_ACTIVEPAIR,
    pair
  }
}