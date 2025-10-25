import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contactWrap}>

      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Get in Touch</h1>
          <p>Have a question or want to collaborate? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </section>

      <div className={styles.contactWrapper}>
        <div className={styles.contactContainer}>
          <div className={styles.contactContent}>
            
            <div className={styles.contactInfo}>
              <div className={styles.infoSection}>
                <h3>Contact Information</h3>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>✉</div>
                  <div className={styles.infoText}>
                    <p><strong>Email</strong></p>
                    <a href="mailto:hello@yourblog.com">hello@yourblog.com</a>
                  </div>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Phone</h3>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📞</div>
                  <div className={styles.infoText}>
                    <p><strong>Call Us</strong></p>
                    <a href="tel:+1234567890">+1 (234) 567-890</a>
                  </div>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Follow Us</h3>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>🔗</div>
                  <div className={styles.infoText}>
                    <p><strong>Social Media</strong></p>
                    <a href="#">Twitter</a> • <a href="#">LinkedIn</a> • <a href="#">Instagram</a>
                  </div>
                </div>
              </div>
            </div>

            <form className={styles.contactForm} style={{ maxWidth: '420px' }}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" required/>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required/>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required/>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>Send Message</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact;
