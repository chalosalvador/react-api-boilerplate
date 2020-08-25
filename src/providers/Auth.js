/**
 * Created by chalosalvador on 2/5/20
 */
import React, { useEffect } from 'react';
import API from '../data';
import Cookies from 'js-cookie';
import Routes from '../constants/routes';
import Auth from '../data/auth';

const AuthContext = React.createContext( {
  isAuthenticated: false,
  setAuthenticated: () => {},
} );

export const AuthProvider = ( { children } ) => {
  const [ isAuthenticated, setAuthenticated ] = React.useState( false );
  const [ isCheckingAuth, setIsCheckingAuth ] = React.useState( true );
  const [ currentUser, setCurrentUser ] = React.useState( null );
  /**
   * This keeps in sync the auth status for all the browser tabs
   */
  useEffect( () => {
    const initializeAuth = async() => {
      window.addEventListener( 'storage', syncLogout );
      console.log( 'added storage event' );

      const token = !!Cookies.get( 'token' );
      if( token ) {
        try {
          // TODO change to useSWR and revalidate
          const currentUserResponse = await API.get( '/user' );
          console.log( 'currentUserResponse', currentUserResponse );
          setCurrentUser( currentUserResponse && currentUserResponse.data );
          setAuthenticated( true );
        } catch( e ) {
          console.log( 'e', e );
          setAuthenticated( false );
        }
      }
      setIsCheckingAuth( false );

      return () => {
        console.log( 'remove storage event' );

        window.removeEventListener( 'storage', syncLogout );
        window.localStorage.removeItem( 'login' );
      };
    };

    initializeAuth();
  }, [] );


  const syncLogout = event => {
    console.log( 'event', event );

    if( event.key === 'login' ) {
      // if( event.newValue === 'true' ) {
        console.log( 'login from storage!' );
        // const token = Cookies.get( 'token' ); // check if the token exists
        // setAuthenticated( true );
        window.location.reload();
      // } else {
        // console.log( 'logged out from storage!' );
        // Cookies.remove( 'token' );
        // setCurrentUser( null );
        // setAuthenticated( false );
      // }
    }
  };

  return (
    <AuthContext.Provider
      value={ {
        isAuthenticated,
        isCheckingAuth,
        setAuthenticated,
        currentUser,
        setCurrentUser
      } }
    >
      { children }
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext( AuthContext );
  if( context === undefined ) {
    throw new Error( 'useAuth must be used within an AuthProvider' );
  }
  return context;
}

// export function useIsAuthenticated() {
//   const context = useAuth();
//   return context.isAuthenticated;
// }
