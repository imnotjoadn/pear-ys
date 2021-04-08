import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import { FirebaseReducer, useFirestoreConnect, isEmpty, isLoaded, useFirestore } from 'react-redux-firebase'
import { Pairwise, DoComparison } from '../../lib/pair';
import { Button, ButtonGroup, LinearProgress, Chip, createStyles, Paper, Typography, makeStyles, ListItem, List, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Moment from 'react-moment';

import Result from './Result';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

// https://material.io/resources/icons/?icon=play_arrow&style=baseline

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: "space-between",
            padding: theme.spacing(2),
        },
        paper: {
            flexBasis: '45',
            padding: theme.spacing(2),
        },
        chip: {
            margin: theme.spacing(1),
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        pairRoot: {
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            padding: theme.spacing(2),
        },
        pairPaper: {
            maxWidth: "40rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: theme.spacing(2),
        },
        buttonGroup: {
            display: "flex",
            marginTop: theme.spacing(2),
            width: "100%"
        },
        pairButton: {
            flexBasis: "50%",
            fontSize: "4rem"
        },

    }));

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

interface ComparisonParams {
    id: string;
}

// Save on the go --> How to keep in sync?
// deal with finish
// shuffle left/right
// randomize order completely

function Comparison() {
    const classes = useStyles();
    const { id: pairId } = useParams<ComparisonParams>();
    const [comparison, setComparison] = useState<DoComparison | null>(null);
    const [currentPairIdx, setCurrentPairIdx] = useState<number | null>(null);
    const firestore = useFirestore();

    // Either 1 or 0
    const buttonFlipA = Math.floor(Math.random() * 2);
    // opposite of buttonFlipA
    const buttonFlipB = buttonFlipA ? 0 : 1;

    const { uid } = useSelector<RootState, FirebaseReducer.AuthState>(state => state.firebase.auth)
    // https://blog.logrocket.com/getting-started-react-redux-firebase/

    useFirestoreConnect([
        {
            collection: 'pairwise',
            doc: pairId,
            storeAs: 'pairwise'
        }
    ]);

    useFirestoreConnect([
        {
            collection: `comparisons`,
            where: [['owner', '==', uid], ['pairId', '==', pairId]],
            storeAs: 'list'
        }
    ]);

    // http://localhost:3000/comparison/ueIHiJBByzrALwSXmxYm

    const pair = useSelector<RootState, Pairwise>((state: RootState) => state.firestore.data.pairwise);

    const comparisons = useSelector<RootState, DoComparison[]>(state => state.firestore.ordered.list);

    const generatePairs = (items: string[]) => {
        const pairs: [string, string][] = [];

        const n = items.length;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                pairs.push([items[i], items[j]]);
            }
        }

        return pairs;
    }

    const pairs = useMemo(() => pair && generatePairs(pair.items), [pair]);

    const finished = useMemo(() => {
        return pairs && comparison?.result.length == pairs.length;
    }, [currentPairIdx, comparison]);

    useEffect(() => {
        next();
    }, [comparison]);

    const next = () => {
        // Find the index of the next undefined value in result.
        const nextIndex = comparison?.result.length;
        setCurrentPairIdx(nextIndex!);
    }

    if (!isLoaded(pair)) {
        return <span>Loading...</span>
    }

    if (isEmpty(pair) || !pair?.owner) {
        return <span>404</span>
    }

    const onStart = async () => {
        const comparison: DoComparison = {
            owner: uid,
            pairId,
            timestamp: Number(new Date()),
            result: [],
        };
        const { id } = await firestore.collection('comparisons').add(comparison);
        setComparison({ ...comparison, id });
    }

    const onSelected = (rightSelected: boolean) => {
        comparison!.result[currentPairIdx!] = rightSelected;
        // Save?
        firestore.collection('comparisons').doc(comparison!.id).set(comparison!);
        next();
    }

    const exit = () => {
        setComparison(null);
    }
    
    const onDelete = (id: string) => {
        firestore.collection('comparisons').doc(id).delete();
    }

    const onPreviousComparisonClicked = (c: DoComparison) => {
        setComparison({...c, result: [...c.result]});
    }

    // https://github.com/prescottprue/react-redux-firebase/issues/829

    // https://material-ui.com/components/chips/
    const hasStarted = !!comparison;
    if (!hasStarted) {
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography variant="h4">
                        {`Compare ${pair.title}`}
                    </Typography>
                    {pair.items.map((item, idx) => <Chip className={classes.chip} key={`pairs_${idx}`} label={item} />)}
                </Paper>

                <Paper className={classes.paper}>
                    <Typography variant="h5">
                        {`Previous Comparisons`}
                    </Typography>  
                    <List>
                        {pairs && comparisons && comparisons.map((c, idx) =>
                            <ListItem key={`comparison_${idx}`} dense button onClick={() => onPreviousComparisonClicked(c)}>
                                <ListItemText secondary={
                                    <div>
                                        <Moment format={"LLL"}>{c.timestamp}</Moment>
                                        <LinearProgress variant="determinate" value={100 * c.result.length / pairs.length}/>
                                    </div>} /> 
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => onDelete(c.id!)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            )}
                    </List>
                </Paper>                

                <Fab onClick={onStart} className={classes.fab} variant="extended" color="primary">
                    <PlayArrowIcon className={classes.extendedIcon} />
                    Start
                </Fab>
            </div>
        );
    }

    if (finished && comparison) {
        return (
            <React.Fragment>
                <Button onClick={exit}>Exit</Button>
                <Result results={comparison.result} pairs={pair.items} generatedPairs={pairs}></Result>
            </React.Fragment>
        );
    }

    if (currentPairIdx == null) {
        return <div>No pair</div>
    }

    return (
        <div className={classes.pairRoot}>            
            <Paper className={classes.pairPaper}>
                <Button onClick={exit}>Exit</Button>
                <Typography variant="h4">
                    {`Compare ${pair.title}`}
                </Typography>
                <ButtonGroup className={classes.buttonGroup} color="primary" aria-label="outlined primary button group" variant="contained" >
                    <Button className={classes.pairButton} onClick={() => onSelected(!!buttonFlipA)}>{pairs[currentPairIdx][buttonFlipA]}</Button>
                    <Button className={classes.pairButton} onClick={() => onSelected(!!buttonFlipB)}>{pairs[currentPairIdx][buttonFlipB]}</Button>
                </ButtonGroup>
                <LinearProgress variant="determinate" value={100 * comparison!.result.length / pairs.length}/>
            </Paper>
        </div>
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
