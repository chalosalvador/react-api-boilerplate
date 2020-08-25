import React, { useState } from 'react';
import API from '../data';
import { translateMessage } from '../utils/translateMessage';
import ArticleList from '../components/ArticleList';
import ArticleForm from '../components/ArticleForm';
import { Button, message, Skeleton, Row, Col } from 'antd';
import { useAuth } from '../providers/Auth';
import { useCategories } from '../data/useCategories';
import ShowError from '../components/ShowError';
import { mutate } from 'swr';

/**
 * Fetch Articles from DB
 */
export const fetchArticles = async() => {
  // console.log( `Show data fetched. Articles: ${ JSON.stringify( articles ) }` );

  return await API.get( '/articles' );
};

/**
 * Articles list page
 * @param props
 * @constructor
 */
const Articles = ( props ) => {

  const [ visible, setVisible ] = useState( false );
  const categories = useCategories();

  const auth = useAuth();

  console.log( 'categories', categories );

  /**
   * Executed after the form is submitted
   * Fetches all the articles and refreshes the list
   * Closes the modal
   */
  const afterCreate = async() => {
    try {
      // show skeleton
      await mutate( '/articles', async articles => {
        return { data: [ {}, ...articles.data ] };
      }, false );

      await mutate( '/articles' );
      setVisible( false ); // close the modal
    } catch( error ) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      );

      message.error( translateMessage( error.message ) );
    }
  };

  return (
    <div>
      {
        auth.isAuthenticated &&
        <Button
          type='primary'
          onClick={ () => {
            setVisible( true );
          } }
        >
          Nuevo artículo
        </Button>
      }

      {
        categories.isLoading
          ? <Row type='flex' justify='center'>
            <Col>
              <Skeleton.Button active />
              <Skeleton.Button active />
              <Skeleton.Button active />
            </Col>
          </Row>
          : categories.isError
          ? <ShowError error={ categories.isError } />
          : <ArticleForm
            categories={ categories.categories }
            visible={ visible }
            update={ false }
            onSubmit={ afterCreate }
            onCancel={ () => {
              setVisible( false );
            } }
          />
      }

      <ArticleList categories={ categories.categories } />
    </div>
  );
};


export default Articles;
