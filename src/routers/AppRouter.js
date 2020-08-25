import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Routes from '../constants/routes';
import NotFoundPage from '../pages/NotFoundPage';
import Loading from '../components/Loading';

const loadableOptions = { fallback: <Loading /> };

const AsyncLogin = loadable( () => import( '../pages/Login' ), loadableOptions );
const AsyncRegister = loadable( () => import( '../pages/Register' ), loadableOptions );
const AsyncHome = loadable( () => import( '../pages/Index' ), loadableOptions );
const AsyncPrivate = loadable( () => import( '../pages/Private' ), loadableOptions );
const AsyncArticles = loadable( () => import( '../pages/Articles' ), loadableOptions );
const AsyncArticle = loadable( () => import( '../pages/Article' ), loadableOptions );
const AsyncAbout = loadable( () => import( '../pages/About' ), loadableOptions );
const AsyncLogout = loadable( () => import( '../pages/Logout' ), loadableOptions );

const AppRouter = () => (
  <Switch>
    <PublicRoute exact path={ Routes.HOME } component={ AsyncHome } />
    <PublicRoute path={ Routes.LOGIN } component={ AsyncLogin } />
    <PublicRoute path={ Routes.REGISTER } component={ AsyncRegister } />
    <PublicRoute path={ Routes.ARTICLES } component={ AsyncArticles } />
    <PublicRoute path={ Routes.ABOUT } component={ AsyncAbout } />

    <PrivateRoute path={ Routes.PRIVATE } component={ AsyncPrivate } />
    <PrivateRoute path={ Routes.ARTICLE_ID } component={ AsyncArticle } />
    <PrivateRoute path={ Routes.LOGOUT } component={ AsyncLogout } />

    <Route component={ NotFoundPage } />
  </Switch>
);

export default AppRouter;
