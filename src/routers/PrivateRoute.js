import React from 'react';
import { Route } from 'react-router-dom';
import withAuth from '../hocs/withAuth';

const PrivateRoute = ( {
  component: Component,
  ...rest
} ) => {

  const getComponent = ( props ) => {
    console.log( 'Component', props );
    return <Component { ...props } />;
  };

  return <Route { ...rest } component={ getComponent } />;
};

export default withAuth( PrivateRoute );
