
import ListAllPosts from '../../components/AdminPage/ListAllPosts'
import AdminPagination from '../../components/AdminPage/AdminPagination'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ListAllBlogs, setPage} from '../../slices/blogSliceAdmin'

const AdminDashboard = () => {

   const dispatch = useDispatch()
    const {success,blogs,currentPage,total,limit, search, filter} = useSelector((store) => store.blogs)
    useEffect(() => {
      dispatch(ListAllBlogs({page: currentPage, limit, search, filter}))
    }, [dispatch, currentPage, limit, search, filter, blogs])

  return (
    <>
    <ListAllPosts blogs_data={blogs} success={success} />
    <AdminPagination page={currentPage} setPage={setPage} total_data_items={total} />
    </>
  )
}

export default AdminDashboard