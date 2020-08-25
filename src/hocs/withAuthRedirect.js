/**
 * Created by chalosalvador on 8/16/20
 */
import { useAuth } from '../providers/Auth';
import Loading from '../components/Loading';
import React from 'react';
import Auth from '../data/auth';
import { Redirect, useHistory } from 'react-router-dom';
import Routes from '../constants/routes';

/**
 * Support client-side conditional redirecting based on the user's
 * authenticated state.
 *
 * @param WrappedComponent The component that this functionality
 * will be added to.
 * @param LoadingComponent The component that will be rendered while
 * the auth state is loading.
 * @param expectedAuth Whether the user should be authenticated for
 * the component to be rendered.
 * @param location The location to redirect to.
 */
export default function withAuthRedirect( {
  WrappedComponent,
  LoadingComponent = Loading,
  expectedAuth,
  location
} ) {
  const WithAuthRedirectWrapper = props => {

    const { isCheckingAuth, isAuthenticated } = useAuth();
    if( isCheckingAuth ) {
      return <LoadingComponent />;
    }
    if( expectedAuth !== isAuthenticated ) {
      console.log( 'OOOUUTTTTTTTTTTTTT', location );

      return <Redirect to={ {
        pathname: location || Routes.LOGIN,
        state: { from: props.location }
      } } />
    }
    return <WrappedComponent { ...props } />;
  };
  return WithAuthRedirectWrapper;
}
