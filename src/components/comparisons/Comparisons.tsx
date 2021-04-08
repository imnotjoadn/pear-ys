import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { useFirestoreConnect, isLoaded, isEmpty, FirebaseReducer } from 'react-redux-firebase'
import { createStyles, List, ListItem, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import { Pairwise } from '../../lib/pair';

import * as routes from '../../constants/routes';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            margin: theme.spacing(3),
            padding: theme.spacing(2),
        },
        title: {

        },
        list: {

        },
        listItem: {

        },
    })
);

function Comparisons() {
    const { uid } = useSelector<RootState, FirebaseReducer.AuthState>(state => state.firebase.auth);
    const classes = useStyles();
    const history = useHistory();

    useFirestoreConnect([
        {
            collection: `pairwise`,
            where: [['owner', '==', uid]],
            storeAs: 'list'
        }
    ]);
    const comparisons = useSelector<RootState, Pairwise[]>(state => state.firestore.ordered.list);

    const handleListClick = (id: string) => {
        history.push(routes.COMPARISON.replace(routes.ID_IDENTIFIER, id));
    }

    if (!isLoaded(comparisons)) {
        return <span>Loading...</span>
    }

    if (isEmpty(comparisons)) {
        return <span>No comparisons...</span>
    }

    return (
        <Paper className={classes.root}>
            <Typography variant="h6" className={classes.title}>Your Comparisons</Typography>
            <ul>
                {comparisons && comparisons.map((comparison) =>
                    <li key={comparison.id}><a href={routes.COMPARISON.replace(routes.ID_IDENTIFIER, comparison.id!)}>{comparison.title}</a></li>)}
            </ul>            
        </Paper>
    );
}

export default Comparisons;
