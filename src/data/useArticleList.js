/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from 'swr';
import API from './index';

export const useArticleList = () => {
  const { data, error, mutate } = useSWR( '/articles', API.fetcher );

  return {
    articles: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};
