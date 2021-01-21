import React, { useState } from 'react';
import { useDispatch, connect, ConnectedProps, useSelector} from 'react-redux';
import { PairState } from '../../redux/reducers/pairs';
import { RootState } from '../../redux/reducers';
import { useFirebase } from 'react-redux-firebase';
import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import * as routes from '../../constants/routes';

import { useFirestoreConnect, withFirestore, WithFirestoreProps} from 'react-redux-firebase'
import {firestore} from 'firebase';
// https://react-redux-firebase.com/docs/api/withFirebase.html


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
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & WithFirestoreProps & {}

function Create(props: Props) {
    // useFirestoreConnect([
    //     {collection: 'comparisons'}
    // ])
    // const comparisons = useSelector((state) => (state as any).firestore.ordered.comparisons);
    // console.log(comparisons);

    const classes = useStyles();
    const history = useHistory();
    const [title, setTitle] = useState("");    

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)};
    
    const onCreateClick = async () => {
        // Add a comparison
        const comparison = {title};
        const {id} = await props.firestore.add({ collection: 'comparisons'}, { title });
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

const mapStateToProps = (state: RootState) => {
    return {
        
    }
}

const mapDispatchToProps = {
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(withFirestore(Create));
