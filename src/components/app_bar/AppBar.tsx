
import React, { useContext, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router';
import * as routes from '../../constants/routes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function PearysAppBar() {

    const classes = useStyles();
    
    const user = {
        displayName: 'T-dawg'
    }
    const brandName = '🍐ys'

    const history = useHistory();
    

    const handleHomeClick = () => history.push(routes.HOME);
    const handleSignInClick = async () => {
        
    };
    const handleLogoutClick = async () => {
        
    };
    return (
        <AppBar position="sticky">
            <Toolbar variant="regular">
                <Typography variant="h6" onClick={handleHomeClick} className={classes.title}>
                    {brandName}
                </Typography>
                {user && user.displayName}
                <IconButton
                    edge="end"
                    onClick={handleSignInClick}
                    color="inherit"
                >
                    <AccountCircleIcon />
                </IconButton>
                {user && <IconButton
                    edge="end"
                    onClick={handleLogoutClick}
                    color="inherit">
                    <LogoutIcon />
                </IconButton>}
            </Toolbar>
        </AppBar>
    );
}