import styles from './StatsSection.module.css';

const StatsSection = () => {
  return (
    <div className={styles.statsWrapper}>
      <section className={styles.stats}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <i className="bi bi-award-fill"></i>
                </div>
                <div className={styles.statNumber}>Top Posting User</div>
                <div className={styles.statLabel}>Miraj Bhandari</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className={styles.statItem}>
                <div className={styles.statNumber}>500+</div>
                <div className={styles.statLabel}>Articles</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Expert Authors</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StatsSection;
