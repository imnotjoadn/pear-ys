import React from 'react';
import { useHistory } from 'react-router';
import { Button, makeStyles, Paper } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import * as routes from '../../constants/routes';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',            
            flexDirection: 'column',
            alignItems: 'center',
            margin: theme.spacing(3),
            padding: theme.spacing(2),
        },
        buttonsContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        button: {
            margin: theme.spacing(0.5),
        }
    })
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
        <Paper className={classes.root}>
            <div className={classes.buttonsContainer}>                
                <Button className={classes.button} variant="contained" color="secondary" onClick={onClickCreate}>Create</Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={onClickComparisons}>Comparisons</Button>
            </div>
        </Paper>
    )
}

export default Home;