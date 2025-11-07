import styles from './NoPostsFound.module.css';

const NoPostsFound = ({Title="No Posts Found", message="We couldn't find any posts at the moment."}) => {
  return (
    <section className={styles.noFoundWrap}>
      <div className={styles.decorativeDots}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>

      <div className={styles.noPostsContainer}>
        <div className={styles.iconWrapper}>
          <div className={styles.iconCircle}>
            <i className="bi bi-file-earmark-excel"></i>
          </div>
        </div>

        <div className={styles.contentBox}>
          <h1 style={{ fontSize: '2rem', color:'white'}}>{Title}</h1>
          <p>{message}</p>
        </div>
      </div>
    </section>
  );
};

export default NoPostsFound;
