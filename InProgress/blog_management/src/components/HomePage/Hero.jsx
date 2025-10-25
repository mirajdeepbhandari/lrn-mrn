import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Discover Inspiring Stories</h1>
        <p className={styles.heroSubtitle}>
          Explore in-depth articles, expert insights, and thought-provoking content curated for professionals
        </p>

        <div className={styles.searchContainer}>
          <div className={styles.searchBar}>
            <i className={`fas fa-search ${styles.searchIcon}`}></i>
            <input type="text" placeholder="Search articles, topics, authors..." />
            <button type="button">Search</button>
          </div>
        </div>

        <div className={styles.heroButtons}>
          <button className={`${styles.btn} ${styles.btnPrimaryHero}`}>Explore Now</button>
          <button className={`${styles.btn} ${styles.btnSecondaryHero}`}>Learn More</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
