import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import { FirebaseReducer, useFirestoreConnect, isEmpty, isLoaded, useFirestore } from 'react-redux-firebase'
import { Pairwise, DoComparison } from '../../lib/pair';
import { Button, ButtonGroup, Chip, createStyles, Paper, Typography, makeStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

// https://material.io/resources/icons/?icon=play_arrow&style=baseline

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
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
    const [currentPairIdx, setCurrentPairIdx] = useState<number|null>(null);
    const [finished, setFinished] = useState(false);
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

    const pairs = useMemo(() => pair && generatePairs(pair.items), [comparison]);

    useEffect(() => {
        next();
    }, [comparison]);

    const next = () => {
        // finished?
        if (comparison?.result.length == pairs.length) {
            // break out
            setFinished(true);
            return
        }
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
        next();
    }

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
                    <Typography variant="h4">
                        {`Previous Comparisons`}
                    </Typography>
                    <ul>
                        {comparisons && comparisons.map((c, idx) => <li onClick={() => setComparison(c)} key={`comp_${idx}`}>{c.id}</li>)}
                    </ul>
                </Paper>
                
                <Fab onClick={onStart} className={classes.fab} variant="extended" color="primary">
                    <PlayArrowIcon className={classes.extendedIcon} />
                    Start
                </Fab>
            </div>
        );
    }

    if(finished) {
        return (
            <div>Results!</div>
        );
    }

    if (currentPairIdx == null) {
        return <div>No pair</div>
    }

    return (
        <div className={classes.pairRoot}>
            <Paper className={classes.pairPaper}>
                <Typography variant="h4">
                    {`Compare ${pair.title}`}
                </Typography>
                <ButtonGroup className={classes.buttonGroup} color="primary" aria-label="outlined primary button group" variant="contained" >
                    <Button className={classes.pairButton} onClick={()=> onSelected(!!buttonFlipA)}>{pairs[currentPairIdx][buttonFlipA]}</Button>
                    <Button className={classes.pairButton} onClick={()=> onSelected(!!buttonFlipB)}>{pairs[currentPairIdx][buttonFlipB]}</Button>
                </ButtonGroup>
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
