import React, { useState } from 'react';
import { useDispatch, connect, ConnectedProps } from 'react-redux';
import { PairState } from '../../redux/reducers/pairs';
import { RootState } from '../../redux/reducers';
import { useFirebase } from '../../services/firebase';
import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import {UserIsAuthenticated} from '../../auth';

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
}


const useStyles = makeStyles((theme: Theme) =>
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

function Create(props: Props) {
    const classes = useStyles();
    const firebase = useFirebase();
    const [title, setTitle] = useState("");
    

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)};
    // const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {setContent(e.target.value)};
    const onCreateClick = async () => {
        // const id = await firebase.newComparison(appState.user!.uid, {title});        
    };

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
        {/* items */}
        <Button variant="contained" onClick={onCreateClick}>Create</Button>
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

export default UserIsAuthenticated(connector(Create));

// http://react-redux-firebase.com/docs/recipes/routing.html#advanced

// https://redux.js.org/recipes/usage-with-typescript

// Connect: 
// State (Redux State)
// => Props of a component
