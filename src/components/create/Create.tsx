import React, { useState } from 'react';
import { connect, ConnectedProps, useSelector} from 'react-redux';
import { RootState } from '../../redux/reducers';
import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import * as routes from '../../constants/routes';

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

interface UserProfile 
{
    displayName: string | null
}

function Create() {
    const classes = useStyles();
    const history = useHistory();
    const [title, setTitle] = useState("");    

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)};
    
    const auth = useSelector<RootState, FirebaseReducer.AuthState>(state => state.firebase.auth);

    const firestore = useFirestore();
    
    const onCreateClick = async () => {
        // Add a comparison        
        const pair: Pair = {title, owner: auth.uid, items: [] };
        const { id } = await firestore.collection('comparisons').add(pair);
        history.push(routes.COMPARISON.replace(routes.ID_IDENTIFIER, id)); 
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