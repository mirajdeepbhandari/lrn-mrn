import styles from "./Blog.module.css";
import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import instance from "../../utils/axios";
import { URLS } from "../../constants/index";
import BlogLoadingAnimation from '../../components/BlogLoadingAnimation';
import {BASE_URL} from "../../constants/index";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark} from "../../slices/bookmarkSlice";

const Blog = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1); 
    } else {
      navigate("/blogs"); 
    }
  };
  const {bookmarks} = useSelector((store) => store.bookmark);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await instance.get(`${URLS.GET_SINGLE_BLOG.replace(":slug", slug)}`);
        setBlog(res.data.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        navigate("/error/404");
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    fetchBlog();
  }, [slug, navigate]);
  


 return (
  loading ? (
    <BlogLoadingAnimation />
  ) : (
    <section className={styles.sectionWrapperBlogInside}>
     

      <div className={styles.articleContainer}>
        <header className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>
            {blog.title}
          </h1>

          <div className={styles.articleMeta}>
            <div className={styles.authorInfo}>
              <div className={styles.authorAvatar}>
                 <img src={BASE_URL + "/resources" + blog?.author?.image} alt="Author" className={styles.authorAvatar}></img>
              </div>
             
              <div className={styles.authorDetails}>
                <h6>{blog.author.name}</h6>
              </div>
            </div>

            <div className={styles.metaItem}>
              <i className="bi bi-calendar3"></i>
              <span>{new Date(blog.createdAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}</span>
            </div>

            <div className={styles.metaItem}>
              <i className="bi bi-arrow-repeat"></i>
              <span>{new Date(blog.updatedAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}</span>
            </div>
            <br/>
            {
              bookmarks.find(bookmark => bookmark.slug === blog.slug) ? (
                <button className={styles.bookmarkBtn} id="bookmarkBtn" onClick={() => dispatch(removeBookmark(blog.slug))}
                style={{borderColor: "#2e4dffff", color: "#2e4dffff"}}>
                <i className="bi bi-bookmark"></i>
                <span>Saved</span>
                </button>
              ) : ( <>
                   <button className={styles.bookmarkBtn} id="bookmarkBtn" onClick={() => dispatch(addBookmark(blog))}>
                    <i className="bi bi-bookmark"></i>
                    <span>Save</span>
                    </button>
                    </>
                  )} 

            <button className={styles.bookmarkBtn} id="bookmarkBtn" style={{backgroundColor: "#ff2e2e", color: "#fff", border:"none", textDecoration: "none"}} onClick={()=> goBack()}>
              <i class="bi bi-skip-backward-fill"></i>
              <span>Back</span>
            </button>
          </div>

        </header>

         <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div className={styles.featuredImageContainer} style={{ maxWidth: "100%"}}>
       <img
          src={BASE_URL + "/resources" + blog?.image.replace(/\\/g, '/')}
          alt={blog?.title || "Featured image"}
          style={{borderBottom: "1px solid #ccc"}}
        />
      </div>
      </div>

        {/* <article
          className={styles.articleContent}
          style={{ textAlign: "justify" }}
        >
          <p>
            {blog.content}
          </p>

        </article> */}

        <article
        className={styles.articleContent}
        style={{ textAlign: "justify" }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
        ></article>


      </div>
    </section>
  )
);
}
export default Blog