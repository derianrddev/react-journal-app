import { authSlice, checkingCredentials, login, logout } from "../../../store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en authSlice', () => { 

  test('Debe de regresar el estado inicial y llamarse auth', () => { 

    const state = authSlice.reducer( initialState, {} );
    
    expect( authSlice.name ).toBe('auth');
    expect( state ).toEqual( initialState );
    
  });

  test('Debe de realizar la autenticación', () => { 

    const state = authSlice.reducer( initialState, login( demoUser ) );

    expect( state ).toEqual({
      status: 'authenticated', 
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null
    });
    
  });

  test('Debe de realizar el logout sin argumentos', () => { 

    const state = authSlice.reducer( authenticatedState, logout({errorMessage: null}) );

    expect( state ).toEqual({
      status: 'not-authenticated', 
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: null
    });
    
  });

  test('Debe de realizar el logout con argumentos', () => { 

    const state = authSlice.reducer( authenticatedState, logout({errorMessage: 'ERROR'}) );

    expect( state ).toEqual({
      status: 'not-authenticated', 
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: 'ERROR'
    });
    
  });

  test('Debe de cambiar el estado a checking', () => { 

    const state = authSlice.reducer( authenticatedState, checkingCredentials() );

    expect( state.status ).toBe('checking');
    
  });
  
})