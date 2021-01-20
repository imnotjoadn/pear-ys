import { SET_ACTIVEPAIR, ActivePairActions } from '../actionTypes';
import { SetActivePairAction } from '../actionTypes';
import { Pair } from '../../lib/pair';

export interface ActivePairState {
  pair: Pair | null;
}

const initialState: ActivePairState = {
  pair: null,
};

export default function reducer(state = initialState, action: ActivePairActions) {
  switch (action.type) {
    case SET_ACTIVEPAIR:
      const setActivePair = action as SetActivePairAction;
      return {
        ...state,
        pair: setActivePair.pair
      };
    default:
      return state;
  }
}
