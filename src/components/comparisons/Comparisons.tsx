import React from 'react';
import { useSelector, connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { RootState } from '../../redux/reducers';
import { useFirestoreConnect, isLoaded, isEmpty, FirebaseReducer, firestoreConnect } from 'react-redux-firebase'
import { Pairwise } from '../../lib/pair';

import * as routes from '../../constants/routes';
// type PropsFromRedux = ConnectedProps<typeof connector>
// type Props = PropsFromRedux & {
//     auth: FirebaseReducer.AuthState; 
// }

function Comparisons() {
    const {uid} = useSelector<RootState, FirebaseReducer.AuthState>(state => state.firebase.auth);

    useFirestoreConnect([
        {
            collection: `pairwise`,
            where: [['owner', '==', uid]],
            storeAs: 'list'
        }
    ]);

    const comparisons = useSelector<RootState, Pairwise[]>(state => state.firestore.ordered.list);   

    if (!isLoaded(comparisons)) {
        return <span>Loading...</span>
    }
 
    if (isEmpty(comparisons)) {
        return <span>No comparisons...</span>
    }

    // http://react-redux-firebase.com/docs/api/useFirestoreConnect.html?q=

    // forEach // for (x of Y)
    // ArrayLike
    
    // Object.
    // Iterate over the keys of an object.    
    // for in - includes prototypes
    // for of ES5 === foreach     

    return (
        <React.Fragment>
            <ul>
                {comparisons && comparisons.map((comparison) =>
                    <li key={comparison.id}><a href={routes.COMPARISON.replace(routes.ID_IDENTIFIER, comparison.id!)}>{comparison.title}</a></li>)}
            </ul>
        </React.Fragment>
    );
}

export default Comparisons;
  