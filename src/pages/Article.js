import React from 'react';
import CommentsList from '../components/CommentsList';
import { useArticle } from '../data/useArticle';
import ShowError from '../components/ShowError';
import withAuth from '../hocs/withAuth';
import { useParams } from 'react-router-dom';
import { useArticleComments } from '../data/useArticleComments';
import { Skeleton } from 'antd';

const ArticlePage = () => {
  let { id } = useParams();
  const article = useArticle( id );
  const comments = useArticleComments( id );

  return (
    <>
      {
        article.isLoading
          ? <div>Cargando...</div>
          : article.isError
          ? <ShowError error={ article.isError } />
          : <>
            <h1 className='title'>
              Article: { article.article.title }
            </h1>
            <p>{ article.article.body }</p>
          </>
      }

      {
        comments.isLoading
          ? <Skeleton loading={ comments.isLoading } active avatar />
          : comments.isError
          ? <ShowError error={ comments.isError } />
          : article.article && <CommentsList articleId={ id } comments={ comments } />
      }
    </>
  );

};

export default withAuth( ArticlePage );
