import React from 'react';
import { AuthProvider } from '../providers/Auth';
import MainLayout from './Layout';
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

/**
 * - Maneja la lógica principal del sistema
 * - <Router> Envuelve la aplicación en React Router para controlar la navegación entre páginas
 * - <AuthProvider> Se crea el objeto history para poder controlar la navegación fuera de los componentes de React
 * - <MainLayout> Establece la estructura de la página header (menú), content, footer
 * - <AppRouter> Determina el componente que se debe renderizar de acuerdo a la ruta de la página actual
 *
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => (
  <Router history={ history }>
    <AuthProvider>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </AuthProvider>
  </Router>
);

export default App;
