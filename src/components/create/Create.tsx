import React, { useState } from 'react';
import { connect, ConnectedProps, useSelector} from 'react-redux';
import { RootState } from '../../redux/reducers';
import { Button, makeStyles, Paper, TextField, Theme, Typography, IconButton } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import * as routes from '../../constants/routes';
import AddIcon from '@material-ui/icons/Add';
import Item from './Item';

import { FirebaseReducer, useFirestore, withFirestore, WithFirestoreProps} from 'react-redux-firebase'
import { Pairwise } from '../../lib/pair';
// https://react-redux-firebase.com/docs/api/withFirebase.html

const formSpacing = "0.75rem";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
        maxWidth: "40rem",
        margin: theme.spacing(3),
        padding: theme.spacing(2),
    },
    form: {

    },
    heading: {
        textAlign: 'center',
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    itemContainer: {
        flexBasis: "49%",
        display: 'flex'
    },
    item: {
        marginBottom: theme.spacing(1),
        flexGrow: 1,
        // width: `calc(100% - ${theme.spacing(0.3) * 2}px)`,
    },
    itemsContainer: {
        display: 'flex',
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    add: {
        marginBottom: theme.spacing(1),
        flexGrow: 1,
    },    
    footer: {
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "row-reverse",
        // justifyContent: 'flex-end'
    },
    create: {
        
    },
    }),
);

/**
 * Title for comparison
 * 2**N number of add N of items
 * Button: Create comparison.
 * 
 * --> compare/GUID (instance)
 * 
 * Validation
 *  - Title required ✅
 *  - No empty items (or notify)
 *  - No dupes
 *  - Removing items
 * 
 * Backspace items > 2
 */
// type PropsFromRedux = ConnectedProps<typeof connector>
// type Props = PropsFromRedux & WithFirestoreProps & {}

function Create() {
    const classes = useStyles();
    const history = useHistory();
    const [title, setTitle] = useState<string>('');
    const [items, setItems] = useState<string[]>(['', '', '']);
    const [lastAddedIdx, setLastAdded] = useState(-1);    
    const [isTitleValid, setIsTitleValid] = useState(true);
    const [shouldValidate, setShouldValidate] = useState(false);
    const [duplicateDictionary] = useState<Map<string, number>>(new Map());
    
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    
    const auth = useSelector<RootState, FirebaseReducer.AuthState>(state => state.firebase.auth);

    const firestore = useFirestore();

    const onCreateClick = async () => {
        // Add a comparison
        setShouldValidate(true); 
        if(!validateTitle() || !validateItems()) {
            return;
        }
        const pair: Pairwise = {title, owner: auth.uid, items: items };
        const { id } = await firestore.collection('pairwise').add(pair);
        history.push(routes.COMPARISON.replace(routes.ID_IDENTIFIER, id));
    };

    const onAddClick = () => {
        // items.push("")
        // setItems(items);
        // setItems(items.concat(['']));
        setItems([...items, '']);
    }

    const handleItemChange = (idx: number, value: string) => {
        let previousItem = items[idx];
        // decrement previous
        previousItem && duplicateDictionary.set(previousItem, duplicateDictionary.get(previousItem)! - 1);
        // increment current
        value && duplicateDictionary.set(value, (duplicateDictionary.get(value) ?? 0) + 1);

        items[idx] = value;
        setItems([...items]); // No change made. No need to render.
    }
    
    /**
     * Determines whether or not an error on an item exists.
     */
    const hasItemError = (item: string): [boolean, string] => {
        // Look up item in items, and see if I find it twice? it's duped.
        // Remove myself and check indexOf. O(n^2)
        const isEmpty = shouldValidate && !item.length;
        const hasDupes = shouldValidate && duplicateDictionary.get(item)! >= 2;
        const hasError = isEmpty || hasDupes;
        const helperText = isEmpty ? 'Required field.' : (hasDupes ? 'No dupes yo!' : '');
        return [hasError, helperText];
    }    

    // https://keycode.info/
    const onEnterClicked = (idx: number) => {
        items.splice(idx + 1, 0, '');
        setItems([...items]);
        setLastAdded(idx + 1);
    }

    const onBackSpaceClicked = (idx: number) => {
        if (items.length <= 3) {
            return;
        }
        items.splice(idx, 1);
        setItems([...items]);
        // setLastAdded(idx == 0 ? idx : idx - 1);        
        // setLastAdded((idx - 1) || idx);
        // setLastAdded(((idx - 1 > 0) && idx - 1) || idx);
        setLastAdded(Math.max(idx - 1, 0));
    }

    const validateTitle = () => {
        const valid = !!title?.length;
        setIsTitleValid(!!title?.length);
        // Validate items
        return valid;
    }

    const validateItems = () => {
        return items.reduce((previousValue, currentValue) => {
            return previousValue && !hasItemError(currentValue)[0];
        }, true);
    }

    // https://reactjs.org/docs/handling-events.html
    // https://stackoverflow.com/questions/54934975/react-hooks-how-to-avoid-redeclaring-functions-on-every-render
    // https://reactjs.org/docs/hooks-reference.html#usecallback
    // error={hasItemError(item, idx)}
    //                 helperText={}
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
            <Typography variant="h4" className={classes.heading}>
                Create pairwise
            </Typography>
            <Typography variant="h6" className={classes.title}>
                Title
            </Typography>
            <TextField
                className={classes.title}
                autoFocus
                error={shouldValidate && !title.length}
                helperText={(shouldValidate && !title.length) && "Required field."}
                required
                fullWidth
                id="outlined-required"
                label="Title"
                variant="outlined"
                value={title}
                onChange={handleTitleChange} />
            <Typography variant="h6" className={classes.title}>
                Comparisons
            </Typography>
            <div className={classes.itemsContainer}>
                {items.map((item, idx) => {
                    // JS:
                    const [error, helperText] = hasItemError(item);
                    return (
                        <div 
                            key={`item_${idx}`}
                            className={classes.itemContainer}>
                            <Item
                                className={classes.item}
                                {...{error, helperText}}
                                variant="outlined"
                                required
                                label={`Item ${idx + 1}`}
                                index={idx} 
                                focus={idx === lastAddedIdx}
                                value={item}
                                onValueChanged={handleItemChange} 
                                onEnterClicked={onEnterClicked}
                                onBackSpaceClicked={onBackSpaceClicked}
                                onFocused={() => setLastAdded(-1)} />
                        </div>)
                })}
            </div>
            <div className={classes.itemContainer} style={{ width: '100%'}}>
                <Button className={classes.add} variant="outlined" onClick={onAddClick}><AddIcon/></Button>
            </div>
            <div className={classes.footer}>
                <Button className={classes.create} color="primary" variant="contained" onClick={onCreateClick}>Create</Button>
            </div>
        </Paper>
    </div>
    );
}

const mapStateToProps = () => {
    return {
        
    }
}

const mapDispatchToProps = {
}

// const connector = connect(mapStateToProps, mapDispatchToProps);

// export default connector(withFirestore(Create));

// const connector = connect(mapStateToProps, mapDispatchToProps);

export default Create;