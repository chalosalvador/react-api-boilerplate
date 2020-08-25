/**
 * Created by chalosalvador on 3/1/20
 */
import Cookies from 'js-cookie';
import Routes from '../constants/routes';
import history from '../utils/history';

const baseURL = 'http://localhost:8000/api'; // todo move to .env
let headers = { 'Accept': 'application/json' };

const handleRequest = async( endpoint, method, params = null ) => {
    if( !API.headers[ 'Authorization' ] ) {
      API.headers[ 'Authorization' ] = `Bearer ${ Cookies.get( 'token' ) }`;
    }
    const requestData = { method };

    if( params !== null ) {
      if( params instanceof FormData ) {
        requestData[ 'body' ] = params;
        delete headers[ 'Content-Type' ];
      } else {
        requestData[ 'body' ] = JSON.stringify( params );
        headers[ 'Content-Type' ] = 'application/json';
      }
    }

    requestData[ 'headers' ] = headers;
    console.log( 'requestData', requestData );
    const response = await fetch( `${ baseURL }${ endpoint }`, requestData );
    let jsonResponse = {};

    try {
      jsonResponse = await response.json();
      console.log( 'jsonResponse', jsonResponse );

      if( response.status === 401 ) {
        // REFRESH TOKEN AND TRY AGAIN
        console.log( 'jsonResponse 401', jsonResponse );
        console.log( 'COOKIEEEEEEEE', Cookies.get( 'token' ) );
        if( jsonResponse.refreshed_token ) {
          console.log( 'REFRESH TOKEN' );
          API.headers[ 'Authorization' ] = 'Bearer ' + jsonResponse.refreshed_token; // start sending authorization
                                                                                     // header
          console.log( 'API.headers', API.headers );
          Cookies.set( 'token', jsonResponse.refreshed_token, { expires: 1 } );

          return await handleRequest( endpoint, method, params );
        } else {
          history.push( Routes.LOGOUT );
          return Promise.reject( {
            message: jsonResponse.message,
            error: jsonResponse.error || jsonResponse.errors,
            status: response.status
          } );
        }
      }
    } catch( e ) {
      console.log( 'NO BODY', JSON.stringify( e ) );
    }
    // console.log( 'jsonresponse', jsonResponse );

    if( !response.ok ) {
      return Promise.reject( {
        message: jsonResponse.message,
        error: jsonResponse.error || jsonResponse.errors,
        status: response.status
      } );
    }


    const result = {
      status: response.status,
      data: jsonResponse.data || jsonResponse
    };
    // console.log( 'resilt', result );
    return result;
    // return {
    //   status: response.status,
    //   jsonResponse
    // };

  }
;

const post = ( endpoint, params = null ) => {
  return handleRequest( endpoint, 'POST', params );
};

const put = ( endpoint, params = null ) => {
  return handleRequest( endpoint, 'PUT', params );
};

const patch = ( endpoint, params = null ) => {
  return handleRequest( endpoint, 'PATCH', params );
};

const get = ( endpoint ) => {
  return handleRequest( endpoint, 'GET' );
};

const deleteMethod = ( endpoint ) => {
  return handleRequest( endpoint, 'DELETE' );
};

const fetcher = async( ...args ) => {
  const res = await get( ...args );

  console.log( 'res', res );
  return res;
};

const create = ( config ) => {
  return {
    post,
    put,
    patch,
    get,
    delete: deleteMethod,
    fetcher,
    ...config
  };
};


const API = create(
  {
    baseURL,
    headers
  }
);

export default API;
