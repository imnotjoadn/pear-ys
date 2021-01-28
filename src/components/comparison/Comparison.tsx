import React from 'react';
import { useSelector, connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { Pair } from '../../lib/pair';

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

interface ComparisonParams {
    id: string;
}

function Comparison(props: Props) {
    const { id: pairId } = useParams<ComparisonParams>();

    useFirestoreConnect([
        {
            collection: 'comparisons',
            doc: pairId
        }
    ]);

    const pair = useSelector<RootState, Pair>((state: RootState) =>
        state.firestore.data.comparisons && state.firestore.data.comparisons[pairId]);

    if (!isLoaded(pair)) {
        return <span>Loading...</span>
    }

    return (
        <React.Fragment>
            {`Pair ${pair.title}`}
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

export default connector(Comparison);
