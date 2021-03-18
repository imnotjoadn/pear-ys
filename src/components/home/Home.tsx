import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import * as routes from '../../constants/routes';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    heading: {
    },
    button: {
        display: 'flex', 
        alignItems: 'center',
        marginLeft: '20px',
    }
}),
);

function Home() {

    const classes = useStyles();
    
    const history = useHistory();

    const onClickCreate = () => {
        history.push(routes.CREATE);
    }

    const onClickComparisons = () => {
        history.push(routes.COMPARISONS);
    }

    // https://material-ui.com/getting-started/templates/checkout/
    return (
        <div className={classes.root}>
            <h1 className={classes.heading}>Start building a comparison:</h1>
            <div className={classes.button}>
                <Button variant="contained" color="secondary" onClick={onClickCreate}>Create</Button>
            </div>
            <div className={classes.button}>
                <Button variant="contained" color="secondary" onClick={onClickComparisons}>Comparisons</Button>
            </div>
        </div>
    )
}

export default Home;