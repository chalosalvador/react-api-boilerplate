import React from 'react';
import Routes from '../constants/routes';
import { useAuth } from '../providers/Auth';
import { Checkbox, Col, Form, Input, Row, Button, message } from 'antd';
import { LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons/lib';
import API from '../data';
import withoutAuth from '../hocs/withoutAuth';
import Cookies from 'js-cookie';
import { translateMessage } from '../utils/translateMessage';
import { Link } from 'react-router-dom';
import '../styles/login.css';
import ErrorList from '../components/ErrorList';

const Login = () => {
  const { setAuthenticated, setCurrentUser } = useAuth();

  const onFinish = async( userData ) => {

    try {
      const response = await API.post( '/login', {
        email: userData.username,
        password: userData.password
      } );
      console.log( 'response login', response );

      localStorage.setItem( 'login', JSON.stringify( true ) ); // this is to sync auth state in local storage
      Cookies.set( 'token', response.data.token, { expires: 1 } );
      API.headers[ 'Authorization' ] = 'Bearer ' + response.data.token; // start sending authorization header
      setCurrentUser( response.data.user );
      setAuthenticated( true );
    } catch( e ) {
      console.error( 'No se pudo iniciar sesión', e.message );
      setAuthenticated( false );
      const errorList = e.error && <ErrorList errors={ e.error } />;
      message.error( <>{ translateMessage( e.message ) }{ errorList }</> );
    }
  };

  return (
    <>
      {
        <Row justify='center' className='login'>
          <Col span={ 8 }>
            <Form
              name='login-form'
              className='login-form'
              initialValues={ {
                remember: true,
                username: '',
                password: ''
              } }
              onFinish={ onFinish }
            >
              <Form.Item
                name='username'
                rules={ [
                  {
                    required: true,
                    message: 'Ingresa tu nombre de usuario'
                  },
                  {
                    type: 'email',
                    message: 'Ingresa un correo válido'
                  }
                ] }
              >
                <Input prefix={ <UserOutlined className='site-form-item-icon' /> }
                       placeholder='Email'
                       autoComplete='email' />
              </Form.Item>

              <Form.Item
                name='password'
                rules={ [
                  {
                    required: true,
                    message: 'Ingresa tu clave'
                  }
                ] }
              >
                <Input.Password
                  prefix={ <LockOutlined className='site-form-item-icon' /> }
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  placeholder='Password' autoComplete='password'
                />
              </Form.Item>

              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Recordarme</Checkbox>
              </Form.Item>

              <Form.Item>
                <Link className='login-form-forgot' to=''>
                  ¡Olvidé mi clave!
                </Link>
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' className='login-form-button'>
                  Ingresar
                </Button>
                <div>Soy nuevo, <Link to={ Routes.REGISTER }>registrarme</Link></div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      }
    </>
  );
};

export default withoutAuth( Login );
