import React from 'react';
import { AuthProvider } from '../providers/Auth';
import MainLayout from '../components/Layout';
// import NProgress from 'nprogress';
import { Router } from 'react-router-dom';
import AppRouter from '../routers/AppRouter';
import history from '../utils/history';
import 'antd/dist/antd.css';
import '../styles/app.css';

/**
 * Show the loading bar on page transition
 */
  // Router.events.on( 'routeChangeStart', url => {
  //   console.log( `Loading: ${ url }` );
  //   NProgress.start();
  // } );
  // Router.events.on( 'routeChangeComplete', () => NProgress.done() );
  // Router.events.on( 'routeChangeError', () => NProgress.done() );


const App = () => {
    return <div>
      <Router history={ history }>
        <AuthProvider>
          <MainLayout>
            <AppRouter />
          </MainLayout>
        </AuthProvider>
      </Router>
    </div>;
  };

export default App;
