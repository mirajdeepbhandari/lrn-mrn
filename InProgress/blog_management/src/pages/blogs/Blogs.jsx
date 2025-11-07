import MiddleComponent from '../../components/BlogPage/MiddleComponent'
import Pagination from '../../components/Pagination'
import BlogLoadingAnimation from '../../components/BlogLoadingAnimation'
import { useState,useEffect } from 'react'

import {
  useQuery
} from '@tanstack/react-query'
import instance from '../../utils/axios'
import { URLS } from '../../constants/index'

import {searchPreprocessing} from '../../utils/utilityTools'
import useDebounce from '../../hooks/useDebounce';


const Blogs = () => {
  
        useEffect(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, []);
      
      const [page, setPage] = useState(1);
      const [search_term, setSearch_term] = useState('');
      const [sort_term, setSort_term] = useState('');

     const debounced_search_Term = useDebounce(searchPreprocessing(search_term), 800);
     const debounced_sort_Term = useDebounce(sort_term, 400);

      const getBlogs = async ({ queryKey }) => { //coming from useQuery query params
        const [_key, { search_term , sort_term, page}] = queryKey;
        return await instance.get(`${URLS.GET_PUBLISHED_BLOGS}?title=${search_term}&sort=${sort_term}&page=${page}&limit=6`);
      };

      // Queries // https://tanstack.com/query/latest/docs/framework/react/guides/query-functions
      const {data, isPending}= useQuery({ queryKey: ['published-blogs', {search_term: debounced_search_Term , sort_term: debounced_sort_Term, page}], queryFn: getBlogs });
     

 return (
  <>
    {isPending ? (
      <BlogLoadingAnimation />
    ) : (
      <>
        <MiddleComponent  cardsData={data?.data?.data?.data}  setSearch_term={setSearch_term} search_term={search_term} sort_term={sort_term} 
        setSort_term={setSort_term} setPage={setPage}/>
        {data?.data?.data?.data.length > 0 && <Pagination total_data_items={data?.data?.data?.total} page={page} setPage={setPage}/>}
      </>
    )}
  </>
)

}

export default Blogs