import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from '../../firebase/provider';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, login, logout } from './';

export const checkingAuthentication = () => {
  
  return async( dispatch ) => {
    dispatch( checkingCredentials() );
  }
}

export const startGoogleSignIn = () => {
  
  return async( dispatch ) => {

    dispatch( checkingCredentials() );

    const result = await singInWithGoogle();
    const { ok, errorMessage } = result;
    
    if ( !ok ) return dispatch( logout({ errorMessage }) );

    dispatch( login( result ) );
  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  
  return async( dispatch ) => {

    dispatch( checkingCredentials() );

    const result= await registerUserWithEmailPassword({ email, password, displayName });
    const { ok, errorMessage } = result;
    
    if ( !ok ) return dispatch( logout({ errorMessage }) );

    dispatch( login( result ) );
  }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
  
  return async( dispatch ) => {

    dispatch( checkingCredentials() );

    const result = await loginWithEmailPassword({ email, password });
    const { ok, errorMessage } = result;
    
    if ( !ok ) return dispatch( logout({ errorMessage }) );

    dispatch( login( result ) );
  }
}

export const startLogout = () => {
  
  return async( dispatch ) => {

    dispatch( checkingCredentials() );

    const { errorMessage } = await logoutFirebase();
    
    dispatch( clearNotesLogout() );
    dispatch( logout({ errorMessage }) );
  }
}
