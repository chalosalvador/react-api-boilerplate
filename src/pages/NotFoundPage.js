import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import Routes from '../constants/routes';

const NotFoundPage = () => (
  <Result
    status='404'
    title='404'
    subTitle='Ups... no encontramos la página que buscabas'
    extra={ <Link to={ Routes.HOME }><Button type='primary'>Ir al inicio</Button></Link> }
  />
);

export default NotFoundPage;
