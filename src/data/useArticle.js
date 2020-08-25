/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from 'swr';
import API from './index';

export const useArticle = ( id, options= {refreshInterval:0, revalidateOnFocus:false} ) => {
  console.log( 'API.headers useArticle', API.headers );
  console.log( 'ID useArticle', id );
  console.log( 'initialData useArticle', options );

  const { data, error } = useSWR( `/articles/${ id }`, API.fetcher, options );

  return {
    article: data && data.data,
    isLoading: !error && !data,
    isError: error
  };
};
