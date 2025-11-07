import './ListAllPosts.css';
import { useState, useEffect } from 'react';
import {BASE_URL} from "../../constants/index";
import { Link } from 'react-router';
import {setSearch, setFilter, setPage, setSuccess} from '../../slices/blogSliceAdmin'
import {useDispatch} from 'react-redux'
import  useDebounce from '../../hooks/useDebounce'
import {updateStatusBySlug, deleteBlogBySlug} from '../../slices/blogSliceAdmin'
import {searchPreprocessing} from '../../utils/utilityTools'
import AlertBox from '../../components/AlertBox'
import Swal from 'sweetalert2';

const ListAllPosts = ({blogs_data=[], success=""}) => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");  
  const debouncedSearch = useDebounce(searchText, 500); 

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
    dispatch(setPage(1)); 
  }

  useEffect(() => {
    dispatch(setSearch(debouncedSearch));
    dispatch(setPage(1));
  }, [debouncedSearch, dispatch]);

const handleSearchChange = (e) => {
    setSearchText(searchPreprocessing(e.target.value)); 
  }

const handlePublish = (e, slug) => {
  e.preventDefault();
  dispatch(updateStatusBySlug({slug, status: "published"}));
  setTimeout(() => {
    dispatch(setSuccess(""));
  }, 5000);
}

const handleDelete = async (e, slug) => {
  e.preventDefault();

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  if (result.isConfirmed) {
    dispatch(deleteBlogBySlug(slug));
    Swal.fire({
      title: "Deleted!",
      text: "Your blog has been deleted.",
      icon: "success"
    });

    setTimeout(() => {
      dispatch(setSuccess(""));
    }, 5000);
  }
};


  return (
    <div className="main-container">
      <div className="container-fluid">
        <div className="page-header">
          <div className="page-title">
            <i className="bi bi-file-text"></i>
            Blog Management
          </div>
        </div>

        <div className="search-filter-section">
          <div className="row align-items-center gap-3">
            <div className="col-12 col-md">
              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{
                    backgroundColor: "#334155", 
                    borderColor: "#475569", 
                    color: "#cbd5e1",
                  }}
                >
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control search-input"
                  id="searchInput"
                  style={{backgroundColor: "#1e293b", borderColor: "#475569", color: "#e2e8f0" , height: "48px"}} 
                  onChange={(e) => handleSearchChange(e)}
                />
              </div>
            </div>
            <div className="col-12 col-md-auto">
              <div>
      <small style={{color:"#f5f5f5ff"}}>Filter by Status:</small>
          <div className="mt-2">
            <select
              className="form-select"
              onChange={(e) =>handleFilterChange(e)}
              defaultValue="all"
            >
              <option value="all">All</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
            </div>
          </div>
        </div>
        {
          success && <AlertBox errorMsg={success} type="success" />
        }
        {/* Blog Cards Section */}
        <div className="blog-posts-container" id="blogsContainer">
          
          {
            blogs_data.length > 0  ?
            blogs_data.map((blog) =>(
              <div className="blog-card" data-status="draft" key={blog.slug}>
            <img
              src={BASE_URL + "/resources" + blog.image.replace(/\\/g, '/')}
              alt="Blog Image"
              className="blog-card-image"
            />
            <div className="blog-card-body">
              <span className="blog-card-status draft" style={{color: blog.status === "published" ? "#3bb6d2ff" : "#d23b8eff"}}>{blog.status}</span>
              <h5 className="blog-card-title">
                {blog.title}
              </h5>
              <div className="blog-card-meta">
                <div className="blog-card-meta-item">
                  <i className="bi bi-person"></i>
                  <span>{blog.author.name}</span>
                </div>
                <div className="blog-card-meta-item">
                  <i className="bi bi-calendar"></i>
                  <span>
                  {new Date(blog.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </span>

                </div>
                <div className="blog-card-meta-item">
                  <i className="bi bi-clock"></i>
                  {new Date(blog.updatedAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </div>
              </div>

                <Link to={`/admin/blog/${blog.slug}`} className="action-btn btn-read-more" style={{width:"100px", marginBottom:"10px", textDecoration:"none"} }>
                  <i className="bi bi-arrow-right" style={{fontSize:"18px", fontWeight:"700"}}></i>Read
                </Link >

              <div className="blog-card-actions">
                
              <button
                className="action-btn btn-publish"
                disabled={blog.status === "published"}
                style={{
                  backgroundColor: blog.status === "published" ? "white" : "",
                  color: blog.status === "published" ? "gray" : "",
                  cursor: blog.status === "published" ? "not-allowed" : "pointer",
                }}
                onClick={(e)=> handlePublish(e, blog.slug)}
              >
                {blog.status === "published" ? "" : <i className="bi bi-plus-circle"></i>} {blog.status === "published" ? "Published" : "Publish"}
              </button>
                <button
                  className="action-btn btn-reject"
                  onClick={(e) => handleDelete(e, blog.slug)}
                >
                  <i className="bi bi-x-circle"></i>Remove
                </button>
              </div>
            </div>
              </div>
            )
            ):
          (
            <div>No blogs available</div>
          )
          }

        </div>

      </div>
    </div>
  );
};

export default ListAllPosts;
