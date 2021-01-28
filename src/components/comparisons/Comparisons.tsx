import React from 'react';
import { useSelector, connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Pair } from '../../lib/pair';

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

function Comparisons(props: Props) {
    useFirestoreConnect([{
        collection: 'comparisons',
        storeAs: "list"
      }]) // sync todos collection from Firestore into redux

    const comparisons = useSelector<RootState, Pair[]>((state: RootState) => state.firestore.ordered.list);

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
                    <li key={comparison.id}>{comparison.title}</li>)}
            </ul>
        </React.Fragment>
    );
}

const mapStateToProps = (state: RootState) => {
    return {

    }
}

const mapDispatchToProps = {
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Comparisons);
