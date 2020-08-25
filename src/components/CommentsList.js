import { Comment, List, Tooltip, Form, Input, Button, Avatar, message, Skeleton } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import API from '../data/index';
import { translateMessage } from '../utils/translateMessage';
import ErrorList from './ErrorList';
import { useArticleComments } from '../data/useArticleComments';
import Routes from '../constants/routes';
import { Link } from 'react-router-dom';

const { TextArea } = Input;

const CommentsList = ( { comments, articleId } ) => {

  console.log( 'props', comments );
  const [ submitting, setSubmitting ] = useState( false );

  const handleSubmit = async( values ) => {
    console.log( 'values', values );
    setSubmitting( true );

    try {

      // setValue( '' );
      comments.mutate( {
        data: [
          {}, // to show the skeleton for new comment
          ...comments.comments,
        ]
      }, false );
      await API.post( `/articles/${ articleId }/comments`, {
        text: values.text,
        article_id: articleId
      } );
      comments.mutate(); // get updated data
      setSubmitting( false );
    } catch( error ) {
      console.log( 'error', error );
      setSubmitting( false );
      const errorList = error.response.error_list && <ErrorList errors={ error.response.error_list } />;

      message.error( <>
        { translateMessage( error.message ) }
        { errorList }
      </> );
    }
  };

  const Editor = ( { onSubmit, submitting } ) => {
    const [ form ] = Form.useForm();

    return (
      <Form
        form={ form }
        name='form_comment'
        onFinish={ handleSubmit }>
        <Form.Item name='text'
                   rules={ [
                     {
                       required: true,
                       message: 'Ingresa el texto de tu comentario'
                     }
                   ] }>
          <TextArea rows={ 4 } />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' loading={ submitting } type='primary'>
            Enviar comentario
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <>
      <Comment
        avatar={ <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' alt='Han Solo' /> }
        content={ <Editor onSubmit={ handleSubmit } submitting={ submitting } /> }
      />

      <List
        className='comment-list'
        header={ `${ comments.comments && comments.comments.length } comentarios` }
        itemLayout='horizontal'
        dataSource={ processCommentsData( comments.comments ) }
        renderItem={ ( item ) => {
          if( item.author ) {
            return (
              <Comment
                // actions={ item.actions }
                author={ item.author }
                content={ item.content }
                datetime={ item.datetime }
              />
            );
          } else {
            return <Skeleton loading={ true } active avatar />;
          }
        } }
      />
    </>
  );
};

export default CommentsList;

const processCommentsData = ( comments ) => {
  return comments.map( ( comment ) => {
    console.log( 'comment', comment );
    if( comment.text ) {
      return ({
        // actions: [ <span key='comment-list-reply-to-0'>Reply to</span> ],
        author: <Link to={ Routes.USERS_ID }>{ comment.user_data.name }</Link>,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: <p>{ comment.text }</p>,
        datetime: <Tooltip title={ moment( comment.created_at ).format( 'YYYY-MM-DD HH:mm:ss' ) }>
          <span>{ moment( comment.created_at ).fromNow() }</span>
        </Tooltip>,
      });
    } else {
      return {};
    }
  } );
};
