import styles from './MyBookmarks.module.css';
import { Link } from "react-router"; 
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from "../../constants/index";
import NoPostsFound from '../../components/NoPostsFound';
import { removeBookmark, clearBookmarks } from "../../slices/bookmarkSlice";
import Swal from 'sweetalert2';

const MyBookmarks = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((store) => store.bookmark.bookmarks);
  const handleRemoveAll = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    if (result.isConfirmed) {
        dispatch(clearBookmarks());
        Swal.fire({
          title: "Deleted!",
          text: "Your bookmarks has been deleted.",
          icon: "success"
        });
      }
   
  }

  return (
    <section className={styles.blogWrapper}>
      <main className={styles.blogContainer}>
        <div className={styles.bubbleContainer} aria-hidden="true">
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
        </div>

        <div className={styles.blogHeader}>
          <h1 className={styles.blogTitle}>My Bookmarks</h1>
          <p className={styles.blogSubtitle}>
            Browse your saved articles and keep track of your favorites !!!
          </p>
          {bookmarks.length > 0 && (
            <p className={styles.blogSubtitle}>
              To Remove All Bookmarks !!!{" "}
              <button style={{ backgroundColor: "transparent", border: "none", color: "#ee2a37ff" }} onClick={() => handleRemoveAll() }>
                <span>
                  <i className="bi bi-trash3-fill"></i> Click Here
                </span>
              </button>
            </p>
          )}
        </div>

        {bookmarks.length === 0 ? (
          <NoPostsFound Title = {"No Bookmarks Found"} message= {"You have not added any bookmarks yet."} />
        ) : (
          <div className={styles.blogGrid} id="blogGrid">
            {bookmarks.map((bookmark) => (
              <article className={styles.blogCard} key={bookmark.slug}>
                <img
                  src={BASE_URL + "/resources" + (bookmark.image?.replace(/\\/g, '/') || '')}
                  alt={bookmark.title}
                  className={styles.blogCardImage}
                />

                <div className={styles.blogCardHeader}>
                  <h2 className={styles.blogCardTitle}>{bookmark.title}</h2>
                  <div>
                    <Link to={`/blog/${bookmark.slug}`} style={{ textDecoration: 'none' }}>
                      <button className={styles.readMore}>
                        View Content <span>...</span>
                      </button>
                    </Link>
                  </div>
                </div>

                <div className={styles.blogCardMeta}>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorAvatar}>
                      <img
                        src={BASE_URL + "/resources" + (bookmark.author?.image?.replace(/\\/g, '/') || '')}
                        alt={bookmark.author?.name || "Author"}
                        className={styles.authorAvatar}
                      />
                    </div>
                    <div>
                      <p className={styles.authorName}>{bookmark.author?.name}</p>
                      <p className={styles.publishDate}>
                        Published at: {new Date(bookmark.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </p>
                      <p className={styles.publishDate}>
                        Last Updated at: {new Date(bookmark.updatedAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.blogCardFooter}>
                  <div className={styles.engagementStats}>
                    <button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => dispatch(removeBookmark(bookmark.slug))}>
                      <span className={styles.stat}>
                        <i className="bi bi-eraser-fill"></i> Remove
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </section>
  );
};

export default MyBookmarks;
