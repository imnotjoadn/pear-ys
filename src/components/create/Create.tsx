import React, { useState } from 'react';
import { useDispatch, connect, ConnectedProps } from 'react-redux';
import { PairState } from '../../redux/reducers/pairs';
import { RootState } from '../../redux/reducers';
import { useFirebase } from '../../services/firebase';
import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core';

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & { }

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
    

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value) };
    
    const onCreateClick = async () => {
        // todo: appState.user!.uid        
        const id = await firebase.newComparison("", {title});        
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

export default connector(Create);
