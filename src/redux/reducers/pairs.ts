import { SET_DARKMODE, PairActions } from '../actionTypes';
import { SetDarkModeAction } from '../actionTypes';

export interface PairState {
  darkMode?: boolean;
}

const initialState: PairState = {
  darkMode: false
};

export default function reducer(state = initialState, action: PairActions) {
  switch (action.type) {
    case SET_DARKMODE:
      const setDarkMode = action as SetDarkModeAction;
      return {
        ...state,
        darkMode: setDarkMode.darkMode
      };    
    default:
      return state;
  }
}

// https://redux.js.org/recipes/usage-with-typescript