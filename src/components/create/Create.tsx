import React, { useState, useCallback, useEffect } from 'react';
import { connect, ConnectedProps, useSelector} from 'react-redux';
import { RootState } from '../../redux/reducers';
import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import * as routes from '../../constants/routes';
import Item from './Item';

import { FirebaseReducer, useFirestore, withFirestore, WithFirestoreProps} from 'react-redux-firebase'
import { Pair } from '../../lib/pair';
// https://react-redux-firebase.com/docs/api/withFirebase.html


const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    }),
);

/**
 * Title for comparison
 * 2**N number of add N of items
 * Button: Create comparison.
 * 
 * --> compare/GUID (instance)
 */
// type PropsFromRedux = ConnectedProps<typeof connector>
// type Props = PropsFromRedux & WithFirestoreProps & {}

function Create() {
    const classes = useStyles();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [items, setItems] = useState(["",""]);
    const [lastAddedIdx, setLastAdded] = useState(-1);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)};
    
    const auth = useSelector<RootState, FirebaseReducer.AuthState>(state => state.firebase.auth);

    const firestore = useFirestore();

    const onCreateClick = async () => {
        // Add a comparison        
        const pair: Pair = {title, owner: auth.uid, items: items };
        const { id } = await firestore.collection('comparisons').add(pair);
        history.push(routes.COMPARISON.replace(routes.ID_IDENTIFIER, id)); 
    };

    const onAddClick = () => {
        // items.push("")
        // setItems(items);
        // setItems(items.concat(['']));
        setItems([...items, '']);
    }

    const onItemChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        setTitle(e.target.value)
    };

    const handleItemChange = (idx: number, value: string) => {
        items[idx] = value;
        setItems([...items]); // No change made. No need to render.
    }

    // https://keycode.info/
    const onEnterClicked = (idx: number) => {
        items.splice(idx + 1, 0, "");
        setItems([...items]);
        setLastAdded(idx + 1);
    }

    // https://reactjs.org/docs/handling-events.html
    // https://stackoverflow.com/questions/54934975/react-hooks-how-to-avoid-redeclaring-functions-on-every-render
    // https://reactjs.org/docs/hooks-reference.html#usecallback


    // Text fields, with a + button to add more.
    // Start with 2x component, don't let proceed without completing (validation)
    // Each click/enter add new component
    // 

    // Next time: 
    // - Validation
    // - UI styling, make it look like a form.

    return (
        <div className={classes.root}>
        <TextField
            autoFocus
            required
            fullWidth
            id="outlined-required"
            label="Title"
            variant="outlined"
            value={title}
            onChange={handleTitleChange} />
        {items.map((item, idx) => {
            return (
                <Item 
                    variant="outlined"
                    required
                    label={`Item ${idx + 1}`}
                    key={`item_${idx}`}
                    index={idx} 
                    focus={idx === lastAddedIdx} 
                    value={item} 
                    onValueChanged={handleItemChange} 
                    onEnterClicked={onEnterClicked}
                    onFocused={() => setLastAdded(-1)} />)
        })}
        <Button onClick={onAddClick}>Add</Button>
        <Button variant="contained" onClick={onCreateClick}>Create</Button>
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