import styles from "./LatestBlog.module.css";

const LatestBlog = () => {
  return (
    <section className={styles.latestBlog}>
      <div className="container">
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "30px"}}>
        <h2
          className="section-title"
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Latest Articles
        </h2>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className={styles.blogCard}>
              <div className={styles.blogCardImage}>
                <i className="fas fa-pen-fancy"></i>
              </div>
              <div className={styles.blogCardContent}>
                <h3 className={styles.blogCardTitle}>
                  The Future of Digital Innovation
                </h3>
                <p className={styles.blogCardExcerpt}>
                  Explore how emerging technologies are reshaping the digital
                  landscape and what it means for businesses in 2024.
                </p>
                <div className={styles.blogCardMeta}>
                  <div className={styles.blogCardAuthor}>
                    <div className={styles.blogCardAuthorAvatar}>JD</div>
                    <span>John Davis</span>
                  </div>
                  <div className={styles.blogCardDate}>
                    <i className="fas fa-calendar-alt"></i>
                    <span>Dec 15, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className={styles.blogCard}>
              <div className={styles.blogCardImage}>
                <i className="fas fa-chart-line"></i>
              </div>
              <div className={styles.blogCardContent}>
                <h3 className={styles.blogCardTitle}>
                  Scaling Your Business Efficiently Join thousands of
                  professionals reading premium content daily Join thousands of
                  professionals reading premium content daily
                </h3>
                <p className={styles.blogCardExcerpt}>
                  Proven strategies and best practices for scaling your business
                  without compromising quality or team culture.
                </p>
                <div className={styles.blogCardMeta}>
                  <div className={styles.blogCardAuthor}>
                    <div className={styles.blogCardAuthorAvatar}>LS</div>
                    <span>Lisa Smith</span>
                  </div>
                  <div className={styles.blogCardDate}>
                    <i className="fas fa-calendar-alt"></i>
                    <span>Dec 12, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className={styles.blogCard}>
              <div className={styles.blogCardImage}>
                <i className="fas fa-chart-line"></i>
              </div>
              <div className={styles.blogCardContent}>
                <h3 className={styles.blogCardTitle}>
                  Scaling Your Business Efficiently Join thousands of
                  professionals reading premium content daily Join thousands of
                  professionals reading premium content daily
                </h3>
                <p className={styles.blogCardExcerpt}>
                  Proven strategies and best practices for scaling your business
                  without compromising quality or team culture.
                </p>
                <div className={styles.blogCardMeta}>
                  <div className={styles.blogCardAuthor}>
                    <div className={styles.blogCardAuthorAvatar}>LS</div>
                    <span>Lisa Smith</span>
                  </div>
                  <div className={styles.blogCardDate}>
                    <i className="fas fa-calendar-alt"></i>
                    <span>Dec 12, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className={styles.blogCard}>
              <div className={styles.blogCardImage}>
                <i className="fas fa-chart-line"></i>
              </div>
              <div className={styles.blogCardContent}>
                <h3 className={styles.blogCardTitle}>
                  Scaling Your Business Efficiently Join thousands of
                  professionals reading premium content daily Join thousands of
                  professionals reading premium content daily
                </h3>
                <p className={styles.blogCardExcerpt}>
                  Proven strategies and best practices for scaling your business
                  without compromising quality or team culture.
                </p>
                <div className={styles.blogCardMeta}>
                  <div className={styles.blogCardAuthor}>
                    <div className={styles.blogCardAuthorAvatar}>LS</div>
                    <span>Lisa Smith</span>
                  </div>
                  <div className={styles.blogCardDate}>
                    <i className="fas fa-calendar-alt"></i>
                    <span>Dec 12, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className={styles.blogCard}>
              <div className={styles.blogCardImage}>
                <i className="fas fa-chart-line"></i>
              </div>
              <div className={styles.blogCardContent}>
                <h3 className={styles.blogCardTitle}>
                  Scaling Your Business Efficiently Join thousands of
                  professionals reading premium content daily Join thousands of
                  professionals reading premium content daily
                </h3>
                <p className={styles.blogCardExcerpt}>
                  Proven strategies and best practices for scaling your business
                  without compromising quality or team culture.
                </p>
                <div className={styles.blogCardMeta}>
                  <div className={styles.blogCardAuthor}>
                    <div className={styles.blogCardAuthorAvatar}>LS</div>
                    <span>Lisa Smith</span>
                  </div>
                  <div className={styles.blogCardDate}>
                    <i className="fas fa-calendar-alt"></i>
                    <span>Dec 12, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className={styles.blogCard}>
              <div className={styles.blogCardImage}>
                <i className="fas fa-chart-line"></i>
              </div>
              <div className={styles.blogCardContent}>
                <h3 className={styles.blogCardTitle}>
                  Scaling Your Business Efficiently Join thousands of
                  professionals reading premium content daily Join thousands of
                  professionals reading premium content daily
                </h3>
                <p className={styles.blogCardExcerpt}>
                  Proven strategies and best practices for scaling your business
                  without compromising quality or team culture.
                </p>
                <div className={styles.blogCardMeta}>
                  <div className={styles.blogCardAuthor}>
                    <div className={styles.blogCardAuthorAvatar}>LS</div>
                    <span>Lisa Smith</span>
                  </div>
                  <div className={styles.blogCardDate}>
                    <i className="fas fa-calendar-alt"></i>
                    <span>Dec 12, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Repeat the same structure for other blog cards, updating className with styles.blogCard etc. */}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
