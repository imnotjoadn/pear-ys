import { combineReducers } from "redux";
import pairs from "./pairs";
import activePair from "./activePair";
import app from "./app";


const rootReducer = combineReducers({ pairs, activePair, app });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
