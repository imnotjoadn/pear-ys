import { Pair } from "../lib/pair";
import { FirebaseUser } from "../services/firebase";

export const SET_DARKMODE = "SET_DARKMODE";
export interface SetDarkModeAction {
  type: typeof SET_DARKMODE
  darkMode: boolean;
}

export type PairActions = SetDarkModeAction; // | union other pairactions

export const SET_ACTIVEPAIR = "SET_ACTIVEPAIR";
export interface SetActivePairAction {
  type: typeof SET_ACTIVEPAIR,
  pair: Pair 
}

export type ActivePairActions = SetActivePairAction;

export const SET_USER = "SET_USER";
export interface SetUserAction {
  type: typeof SET_USER,
  user: FirebaseUser | null
}

export type AppActions = SetUserAction;
