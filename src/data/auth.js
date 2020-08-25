/**
 * Created by chalosalvador on 3/1/20
 */
import API from './index';
import Routes from '../constants/routes';
import {history} from 'react-router-dom';
 // import { translateMessage } from '../helpers/translateMessage';
//
//
// /**
//  * checkAuthentication
//  * @param ctx
//  * @returns {string}
//  */
// const checkAuthentication = async() => {
//   // console.log( 'ctx', ctx );
//   const token = cookie( 'token' );
//   console.log( 'token checkAuthentication', token );
//   // If there's no token, it means the user is not logged in.
//   if( !token ) {
//     delete API.headers[ 'Authorization' ]; // stop sending authorization header
//     history.push(Routes.LOGIN)
//
//   } else {
//     API.headers[ 'Authorization' ] = 'Bearer ' + token; // start sending authorization header
//     console.log( 'API.headers checkAuthentication', API.headers );
//     try {
//       const currentUser = await API.get( `/api/user` );
//       console.log( 'currentUser', currentUser );
//     } catch( error ) {
//       console.log( 'Session error', error );
//       // if( error.status === 401 ) {
//       //   console.log( 'TOKEN NOT REFRESHED', error );
//       //   if( typeof window === 'undefined' ) { // on the server
//       //     ctx.res.writeHead( 302, { Location: Routes.HOME } );
//       //     ctx.res.end();
//       //   } else { // on the client
//       //     Router.push( Routes.LOGOUT );
//       //   }
//       // }
//     }
//   }
//
//   return token;
// };

// const Auth = {
//   checkAuthentication,
//   //   login,
//   //   logout
// };
// //
// export default Auth;
