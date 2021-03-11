import React from 'react';
import { useSelector, connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import { FirebaseReducer, useFirestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { Pair } from '../../lib/pair';

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

interface ComparisonParams {
    id: string;
}

function Comparison() {
    const { id: pairId } = useParams<ComparisonParams>();

    const {uid} = useSelector<RootState, FirebaseReducer.AuthState>(state => state.firebase.auth);

    console.log(uid, pairId);
    // https://blog.logrocket.com/getting-started-react-redux-firebase/

    useFirestoreConnect([
        {
            collection: 'comparisons',
            doc: pairId,
            storeAs: 'comparison'
        }
    ]);

    const pair = useSelector<RootState, Pair>((state: RootState) =>
        state.firestore.data.comparison);

    if (!isLoaded(pair)) {
        return <span>Loading...</span>
    }

    if (isEmpty(pair) || !pair?.owner ) {
        return <span>404</span>
    }

    return (
        <React.Fragment>
            {`Pair ${pair.title}`}
            <ul>
                {pair.items.map((item) => <li>{item}</li>)}
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

export default Comparison;
