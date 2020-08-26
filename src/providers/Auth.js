/**
 * Created by chalosalvador on 2/5/20
 */
import React, { useEffect } from 'react';
import API from '../data';
import Cookies from 'js-cookie';

/**
 * Context está diseñado para compartir datos que pueden
 * considerarse “globales” para un árbol de componentes en React
 * Este contexto sirve para pasar la información de la sesión del usuario
 *
 * @type {React.Context<{setAuthenticated: setAuthenticated, isAuthenticated: boolean}>}
 */
const AuthContext = React.createContext( {
  isAuthenticated: false,
  setAuthenticated: () => {},
} );


/**
 * El provider del contexto expone las siguientes variables que pueden ser usadas
 * por los compoenentes que consumen este contexto
 *
 *  - isAuthenticated,
 *  - isCheckingAuth,
 *  - setAuthenticated,
 *  - currentUser,
 *  - setCurrentUser
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export const AuthProvider = ( { children } ) => {
  const [ isAuthenticated, setAuthenticated ] = React.useState( false );
  const [ isCheckingAuth, setIsCheckingAuth ] = React.useState( true );
  const [ currentUser, setCurrentUser ] = React.useState( null );

  /**
   * Este efecto se lanza cuando se monta el contexto y
   * determina si existe una sesión activa en el navegador
   * También añade el evento storage para mantener sincronizadas
   * las sesiones en las diferentes ventanas que tengan abierta la sesión
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


  /**
   * Esta es la función que se lanza en otras ventanas
   * que tienen abierto el sistema para mantener
   * sincronizada la sesión del usuario.
   *
   * @param event
   */
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

/**
 * Este es un hook personalizado que nos permite acceder a la información
 * de la autenticación en cualquier componente del sistema.
 *
 * @returns {{setAuthenticated: setAuthenticated, isAuthenticated: boolean}}
 */
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
