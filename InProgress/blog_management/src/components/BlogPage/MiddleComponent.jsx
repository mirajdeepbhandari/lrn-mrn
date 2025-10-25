import styles from './MiddleComponent.module.css'
import {BASE_URL} from "../../constants/index";
import NoPostsFound from '../../components/NoPostsFound'
import { Link } from "react-router";


const MiddleComponent = ({ cardsData = [] , setSearch_term, search_term="", sort_term="", setSort_term}) => {
  const resetFilters = () => {
    setSearch_term('');
    setSort_term('');
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
          <h1 className={styles.blogTitle}>Latest Articles</h1>
          <p className={styles.blogSubtitle}>Insights, stories, and perspectives</p>
        </div>

        <div className={styles.searchFilterSection}>
          <div className={styles.searchBox}>
            <i className="bi bi-search"></i>
            <input
              type="text"
              id="searchInput"
              placeholder="Search articles by title ..."
              value={search_term}
              onChange={(e) => setSearch_term(e.target.value)}
              autoFocus={!!search_term}
            />
          </div>
          <div className={styles.filterSection}>
            <label htmlFor="filterDropdown" className={styles.filterLabel}>
              Filter by:
            </label>
            <select id="filterDropdown" className={styles.filterDropdown}
              value={sort_term}
              onChange={(e) => setSort_term(e.target.value)}>
              <option value="latest">Latest Posts</option>
              <option value="oldest">Oldest Posts</option>
            </select>
            <button className={styles.resetBtn} type="button" onClick={()=>resetFilters()}>
              Reset Filters
            </button>
          </div>
          
        </div>

      {cardsData.length > 0 ? (
  <div className={styles.blogGrid} id="blogGrid">
    {cardsData.map((card) => (
      <article
        key={card.slug}
        className={styles.blogCard}
        data-likes="234"
        data-date="2025-10-18"
        data-title={card.title}
        data-author="John Developer"
        style={{ cursor: "pointer" }}
      >
        <img
          src={BASE_URL + "/resources" + card.image.replace(/\\/g, '/')}
          alt={card.title}
          className={styles.blogCardImage}
        />
        <div className={styles.blogCardHeader}>
          <h2 className={styles.blogCardTitle} style={{ textAlign: 'center' }}>
            {card.title?.length > 100 ? card.title.slice(0, 100) + " ..." : card.title}
          </h2>
          <p className={styles.blogCardDescription} style={{ textAlign: 'justify' }}>
            {card.content?.length > 200 ? card.content.slice(0, 200) + " ..." : card.content}
          </p>
          <div>
            <Link to={`/blog/${card.slug}`} className={styles.readMore} style={{textDecoration: 'none'}}>
            <button className={styles.readMore}>
              Read More <span style={{ fontSize: "20px" }}>...</span>
            </button>
            </Link>
          </div>
        </div>

        <div className={styles.blogCardMeta}>
          <div className={styles.authorInfo}>
            <div className={styles.authorAvatar}>
              {card.author.image && (
                <img
                  src={BASE_URL + "/resources" + card.author.image.replace(/\\/g, '/')}
                  alt={card.author.name}
                  className={styles.authorAvatar}
                />
              )}
            </div>
            <div>
              <p className={styles.authorName}>{card.author.name}</p>
              <p className={styles.publishDate} style={{ marginTop: '2px' }}>
                Published at: {new Date(card.createdAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </p>
              <p className={styles.publishDate} style={{ marginTop: '2px' }}>
                Last Updated at: {new Date(card.updatedAt).toLocaleString('en-US', {
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
            <span className={styles.stat}>
              <i className="bi bi-heart-fill"></i> 234
            </span>
          </div>
        </div>
      </article>
    ))}
  </div>
) : (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <NoPostsFound />
  </div>
)}

      </main>
    </section>
  )
}

export default MiddleComponent
