import styles from './CtaSection.module.css';

const CtaSection = () => {
  return (
    <div>
      <section className={styles.ctaSection}>
        <div className="container">
            <h2 className={styles.ctaSectionTitle}>Ready to Dive In?</h2>
            <p className={styles.ctaSectionText}>Join thousands of professionals reading premium content daily</p>
            <button className={styles.ctaSectionBtn}>Start Reading Now</button>
        </div>
      </section>
    </div>
  )
}

export default CtaSection;
