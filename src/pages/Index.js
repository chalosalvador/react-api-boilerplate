import React from 'react';
import ArticleList from '../components/ArticleList';
import { useArticleList } from '../data/useArticleList';
import ShowError from '../components/ShowError';

const HomePage = () => {
  const articles = useArticleList();

  return (
    <>
      <h1 className='page-title'>
        <a href='https://nextjs.org'>Next.js!</a> boilerplate
        with <a href='https://ant.design/docs/react/introduce'>Antd</a>
      </h1>

      <p>
        Este es el contenido de la página principal.
      </p>

      <p>
        Empieza editando el código de <code>pages/index.js</code>
      </p>

      <h2>Lista de Artículos</h2>
      {
        articles.isLoading
          ? 'Cargando...'
          : articles.isError
          ? <ShowError error={ articles.isError } />
          : <ArticleList articles={ articles.articles } />
      }
    </>
  );
};


export default HomePage;
