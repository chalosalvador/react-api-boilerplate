import React from 'react';
import { Button, Result } from 'antd';
import { translateMessage } from '../utils/translateMessage';
import Routes from '../constants/routes';

const setStatus = ( status ) => {
  switch( status ) {
    case 403:
    case 401:
      return 403;
    case 500:
      return 500;
    case 404:
      return 404;
    default:
      return 'error';
  }
};

const ShowError = ( { error } ) => {
  console.log( 'props', error.error );
  return (
    <Result status={ setStatus( error.status ) }
            title={ translateMessage( error.error ) }
            subTitle={translateMessage(error.message)}
            extra={ <Button type='primary'>Back Home</Button> } />
  );
};

export default ShowError;
