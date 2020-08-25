import React, { useEffect } from 'react';
import { useAuth } from '../providers/Auth';
import withAuth from '../hocs/withAuth';
import API from '../data';
import Cookies from 'js-cookie';

const Logout = () => {
  const { setAuthenticated, setCurrentUser } = useAuth();
  useEffect( () => {
    async function doLogout() {
      try {
        console.log( 'loggin out' );
        await API.post( '/logout' );
        Cookies.remove( 'token' );
        delete API.headers[ 'Authorization' ];
        window.localStorage.setItem( 'login', JSON.stringify( false ) );
        setAuthenticated( false );
        setCurrentUser( null );
      } catch( e ) {
        console.log( 'e', e );
      }
    }

    doLogout();
  }, [ setAuthenticated ] );
  return <p>Logging out...</p>;
};

export default withAuth( Logout, '/' );
