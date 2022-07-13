import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const singInWithGoogle = async() => {

  try {
    
    const result = await signInWithPopup( firebaseAuth, googleProvider );
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    const { displayName, email, photoURL, uid } = result.user
    return {
      ok: true,
      displayName, email, photoURL, uid
    }

  } catch (error) {

    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage
    }
  }

}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

  try {
    
    const resp = await createUserWithEmailAndPassword( firebaseAuth, email, password );
    const { uid, photoURL } = resp.user;
    await updateProfile( firebaseAuth.currentUser, { displayName } );
    
    return {
      ok: true,
      displayName, email, photoURL, uid
    }

  } catch (error) {

    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage
    }
  }

}

export const loginWithEmailPassword = async({ email, password }) => {

  try {
    
    const result = await signInWithEmailAndPassword( firebaseAuth, email, password );
    const { displayName, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName, email, photoURL, uid
    }

  } catch (error) {

    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage
    }
  }

}

export const logoutFirebase = async() => {
  try {

    await firebaseAuth.signOut();
    
    return  {
      errorMessage: null
    }

  } catch (error) {

    const errorMessage = error.message;

    return {
      errorMessage
    }
  }
  
}