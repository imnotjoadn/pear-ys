import { SET_ACTIVEPAIR, ActivePairActions } from '../actionTypes';
import { SetUserAction, AppActions, SET_USER } from '../actionTypes';
import { FirebaseUser } from '../../services/firebase';

export interface AppState {
  user: FirebaseUser | null;
}

const initialState: AppState = {
  user: null
};

export default function reducer(state = initialState, action: AppActions) {
  switch (action.type) {
    case SET_USER:
      const setUserAction = action as SetUserAction;
      return {
        ...state,
        user: setUserAction.user
      };    
    default:
      return state;
  }
}
