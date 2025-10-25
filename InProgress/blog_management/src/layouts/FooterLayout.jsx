import styles from "./FooterLayout.module.css";

const FooterLayout = () => {
  return (
    <footer className={styles.footerCustom}>
      <div className="container">
        <div className="row">
          {/* Brand / About */}
          <div className="col-md-3">
            <div className={styles.footerSection}>
              <h5>
                <i className="bi bi-pencil-square"></i> BlogHub
              </h5>
              <p style={{ fontSize: "0.95rem", color: "#b0b0b0" }}>
                Your source for quality content, insights, and inspiration in web development and design.
              </p>
              <div className={styles.socialIcons}>
                <a href="#" title="Facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" title="Twitter"><i className="bi bi-twitter"></i></a>
                <a href="#" title="LinkedIn"><i className="bi bi-linkedin"></i></a>
                <a href="#" title="Instagram"><i className="bi bi-instagram"></i></a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <div className={styles.footerSection}>
              <h5><i className="bi bi-link-45deg"></i> Quick Links</h5>
              <ul>
                <li><a href="#home"><i className="bi bi-chevron-right"></i> Home</a></li>
                <li><a href="#blog"><i className="bi bi-chevron-right"></i> Blog</a></li>
                <li><a href="#about"><i className="bi bi-chevron-right"></i> About Us</a></li>
                <li><a href="#contact"><i className="bi bi-chevron-right"></i> Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div className="col-md-3">
            <div className={styles.footerSection}>
              <h5><i className="bi bi-book"></i> Resources</h5>
              <ul>
                <li><a href="#"><i className="bi bi-chevron-right"></i> Documentation</a></li>
                <li><a href="#"><i className="bi bi-chevron-right"></i> Tutorials</a></li>
                <li><a href="#"><i className="bi bi-chevron-right"></i> Code Snippets</a></li>
                <li><a href="#"><i className="bi bi-chevron-right"></i> Tools</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-md-3">
            <div className={styles.footerSection}>
              <h5><i className="bi bi-envelope"></i> Newsletter</h5>
              <p style={{ fontSize: "0.95rem", color: "#b0b0b0", marginBottom: "1rem" }}>
                Subscribe to get the latest articles delivered to your inbox.
              </p>
              <div className={styles.newsletterForm}>
                <input type="email" placeholder="Your email" />
                <button type="button"><i className="bi bi-send"></i></button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p>
            &copy; 2025 BlogHub. All rights reserved. |{" "}
            <a href="#" style={{ color: "#888", textDecoration: "none" }}>Privacy Policy</a> |{" "}
            <a href="#" style={{ color: "#888", textDecoration: "none" }}>Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
