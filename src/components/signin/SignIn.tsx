import React from 'react';
import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import { useFirebase } from 'react-redux-firebase';
import { RouteComponentProps, RouteProps, StaticContext, useHistory } from 'react-router';
import { HOME } from '../../constants/routes';
interface Props extends RouteComponentProps<{}, StaticContext, PState> {

}

interface PState {
  from?: {
    pathname?: string;
  }
}

function SignIn(props: Props) {
  const firebase = useFirebase();
  const history = useHistory();

  const onSigninWithGoogleClick = async () => {
    await firebase.login({ provider: 'google', type: 'popup' });
    redirect();
  }

  const onSigninAnonymousClick = async () => {
    const user = await firebase.auth().signInAnonymously()
    redirect();
  }

  const redirect = () => {
    const from = props.location?.state?.from?.pathname;
    history.push(from ?? HOME);
  }

    return (
        <React.Fragment>
          <div>Sign In</div>
          <Button variant="contained" onClick={onSigninWithGoogleClick}>Sign in with Google</Button>  
          <Button variant="contained" onClick={onSigninAnonymousClick}>Continue as Guest</Button>
        </React.Fragment>
    );
}

export default SignIn;
