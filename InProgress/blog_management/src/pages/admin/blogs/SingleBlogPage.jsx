import {useEffect} from 'react'
import styles from "../../../pages/blogs/Blog.module.css";
import { Link , useParams, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux'
import {getBlogBySlug} from '../../../slices/blogSliceAdmin'
import BlogLoadingAnimation from '../../../components/BlogLoadingAnimation';
import {BASE_URL} from "../../../constants/index";

const SingleBlogPage = () => {
  const { slug } = useParams();
  const {blog, loading} = useSelector((store) => store.blogs)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //use promise and delay 5 seconds before fetching
    const fetchBlog = async () => {
      dispatch(getBlogBySlug({slug}));
    };
    fetchBlog();
  }, [slug,dispatch]);

   useEffect(() => {
    if (!loading && !blog) {
      navigate('/404/not-found');
    }
  }, [loading, blog, navigate]);

  if (loading) {
  return <BlogLoadingAnimation />;
}

  if (!blog?.title) return null;
  
  return (
 <>
   {blog && (
     <section className={styles.sectionWrapperBlogInside}>
      <div className={styles.articleContainer}>
        <header className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>
            {blog?.title}
          </h1>
          <div className={styles.articleMeta}>
            <div className={styles.authorInfo}>
              <div className={styles.authorAvatar}>
                <img
                  src= {BASE_URL + "/resources" + blog?.author?.image} 
                  alt="Author"
                  className={styles.authorAvatar}
                />
              </div>

              <div className={styles.authorDetails}>
                <h6>{blog.author.name}</h6>
              </div>
            </div>

            <div className={styles.metaItem}>
              <i className="bi bi-calendar3"></i>
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

            <div className={styles.metaItem}>
              <i className="bi bi-arrow-repeat"></i>
              <span>
                {new Date(blog.updatedAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
              </span>
            </div>

            <br />

            <Link to="/admin"
              className={styles.bookmarkBtn}
              id="bookmarkBtn"
              style={{
                backgroundColor: "#ff2e2e",
                color: "#fff",
                border: "none",
                textDecoration: "none",
              }}
            >
              <i className="bi bi-skip-backward-fill"></i>
              <span>Back</span>
            </Link>
          </div>
        </header>

        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <div className={styles.featuredImageContainer} style={{ maxWidth: "100%" }}>
            <img
              src={BASE_URL + "/resources" + blog.image.replace(/\\/g, '/')}
              alt="Featured Image"
              style={{ borderBottom: "1px solid #ccc" }}
            />
          </div>
        </div>

        <article
          className={styles.articleContent}
          style={{ textAlign: "justify" }}
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        ></article>
      </div>
    </section>
    ) 
   }
 </>
  )
}

export default SingleBlogPage




