import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../../firebase/provider";
import { checkingAuthentication, checkingCredentials, login, logout, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../store/auth";
import { clearNotesLogout } from "../../../store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../firebase/provider');

describe('Pruebas en AuthThunks', () => { 

  const dispatch = jest.fn();

  beforeEach( () => jest.clearAllMocks() );

  test('Debe de invocar el checkingCredentials', async() => { 

    await checkingAuthentication()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    
  });

  test('startGoogleSignIn debe de llamar checkingCredentials y login - éxito', async() => { 

    const loginData = { ok: true, ...demoUser };
    await singInWithGoogle.mockResolvedValue( loginData );

    // thunk
    await startGoogleSignIn()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    
  });

  test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => {
        
    const loginData = { ok: false, errorMessage: 'Un error en Google' };
    await singInWithGoogle.mockResolvedValue( loginData );

    // thunk
    await startGoogleSignIn()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( logout({ errorMessage: loginData.errorMessage }) );

  });

  test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - éxito', async() => {
        
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

    await registerUserWithEmailPassword.mockResolvedValue( loginData );

    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

  });

  test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - éxito', async() => {
        
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    await loginWithEmailPassword.mockResolvedValue( loginData );

    await startLoginWithEmailPassword(formData)(dispatch);

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

  });

  test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {

    const logoutData = { errorMessage: null };
    
    await logoutFirebase.mockResolvedValue( logoutData );

    await startLogout()(dispatch);
    
    expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
    expect( dispatch ).toHaveBeenCalledWith( logout( logoutData ) );
    
  });
  
})