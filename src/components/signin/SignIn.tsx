import React from 'react';
import { useDispatch, connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { setUser } from '../../redux/actions';
import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import {firebase, FirebaseUser} from '../../services/firebase';


type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  setUser: (user: FirebaseUser) => void;
}

function SignIn(props: Props) {

  const onSigninWithGoogleClick = async () => {
    const user = await firebase.signInWithGoogle();
    props.setUser(user);
  }

  const onSigninAnonymousClick = async () => {
    const user = await firebase.signInAnonymously();
    props.setUser(user);
  }

    return (
        <React.Fragment>
          <div>Sign In</div>
          <Button variant="contained" onClick={onSigninWithGoogleClick}>Sign in with Google</Button>  
          <Button variant="contained" onClick={onSigninAnonymousClick}>Continue as Guest</Button>
        </React.Fragment>
    );
}

const mapStateToProps = (state: RootState) => {
    return {
        
    }
}

const mapDispatchToProps = {
  setUser
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SignIn);
