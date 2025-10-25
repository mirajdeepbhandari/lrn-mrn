import styles from "./About.module.css";
import CtaSection from '../components/HomePage/CtaSection';

const About = () => {
  return (
    <section className={styles.wrapAbout}>

      {/* Mission Section */}
      <section className={`${styles.missionSection} py-5`}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className={`${styles.missionContent} ${styles.fadeInLeft}`}>
                <h2 className={styles.sectionTitle}>Our Mission</h2>
                <p className={styles.sectionText}>
                  We're committed to delivering exceptional value through cutting-edge technology and
                  customer-centric solutions. Our mission is to empower businesses to reach their full potential.
                </p>
                <div className={`${styles.missionFeatures} mt-4`}>
                  <div className={`${styles.featureItem} mb-3`}>
                    <i className={`bi bi-check-circle-fill ${styles.featureIcon}`}></i>
                    <span>Innovation at our core</span>
                  </div>
                  <div className={`${styles.featureItem} mb-3`}>
                    <i className={`bi bi-check-circle-fill ${styles.featureIcon}`}></i>
                    <span>Customer success first</span>
                  </div>
                  <div className={`${styles.featureItem} mb-3`}>
                    <i className={`bi bi-check-circle-fill ${styles.featureIcon}`}></i>
                    <span>Sustainable growth</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={`${styles.missionImage} ${styles.fadeInRight}`}>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
                  alt="Team collaboration"
                  className="img-fluid rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`${styles.valuesSection} py-5`}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className={styles.sectionTitle} style={{color: 'black'}}>Our Core Values</h2>
            <p className={styles.sectionSubtitle} style={{color:'#0b237c' ,fontWeight: '500'}}>The principles that guide everything we do</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className={`${styles.valueCard} ${styles.fadeInUp}`}>
                <div className={styles.valueIcon}>
                  <i className="bi bi-lightbulb"></i>
                </div>
                <h3>Innovation</h3>
                <p>We constantly push boundaries and embrace new ideas to create breakthrough solutions.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className={`${styles.valueCard} ${styles.fadeInUp}`} style={{ animationDelay: '0.1s' }}>
                <div className={styles.valueIcon}>
                  <i className="bi bi-people"></i>
                </div>
                <h3>Collaboration</h3>
                <p>Together we achieve more. We believe in the power of teamwork and diverse perspectives.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className={`${styles.valueCard} ${styles.fadeInUp}`} style={{ animationDelay: '0.2s' }}>
                <div className={styles.valueIcon}>
                  <i className="bi bi-shield-check"></i>
                </div>
                <h3>Integrity</h3>
                <p>We operate with transparency and honesty in all our business relationships and dealings.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className={`${styles.valueCard} ${styles.fadeInUp}`} style={{ animationDelay: '0.3s' }}>
                <div className={styles.valueIcon}>
                  <i className="bi bi-graph-up"></i>
                </div>
                <h3>Excellence</h3>
                <p>We strive for the highest standards in everything we create and deliver to our clients.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`${styles.teamSection} py-5`}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className={styles.sectionTitle} style={{color: 'black'}}>Meet Our Team</h2>
            <p className={styles.sectionSubtitle} style={{color:'#0b237c', fontWeight: '500'}}>Talented individuals united by a common vision</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className={`${styles.teamCard} ${styles.fadeInUp}`}>
                <div className={styles.teamImage}>
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop"
                    alt="Team member"
                  />
                  <div className={styles.teamOverlay}>
                    <div className={styles.socialLinks}>
                      <a href="#" className={styles.socialLink}><i className="bi bi-linkedin"></i></a>
                      <a href="#" className={styles.socialLink}><i className="bi bi-twitter"></i></a>
                      <a href="#" className={styles.socialLink}><i className="bi bi-github"></i></a>
                    </div>
                  </div>
                </div>
                <div className={styles.teamInfo}>
                  <h4>Sarah Johnson</h4>
                  <p className={styles.teamRole}>CEO & Founder</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className={`${styles.teamCard} ${styles.fadeInUp}`} style={{ animationDelay: '0.1s' }}>
                <div className={styles.teamImage}>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
                    alt="Team member"
                  />
                  <div className={styles.teamOverlay}>
                    <div className={styles.socialLinks}>
                      <a href="#" className={styles.socialLink}><i className="bi bi-linkedin"></i></a>
                      <a href="#" className={styles.socialLink}><i className="bi bi-twitter"></i></a>
                      <a href="#" className={styles.socialLink}><i className="bi bi-github"></i></a>
                    </div>
                  </div>
                </div>
                <div className={styles.teamInfo}>
                  <h4>Michael Chen</h4>
                  <p className={styles.teamRole}>CTO</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className={`${styles.teamCard} ${styles.fadeInUp}`} style={{ animationDelay: '0.2s' }}>
                <div className={styles.teamImage}>
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop"
                    alt="Team member"
                  />
                  <div className={styles.teamOverlay}>
                    <div className={styles.socialLinks}>
                      <a href="#" className={styles.socialLink}><i className="bi bi-linkedin"></i></a>
                      <a href="#" className={styles.socialLink}><i className="bi bi-twitter"></i></a>
                      <a href="#" className={styles.socialLink}><i className="bi bi-github"></i></a>
                    </div>
                  </div>
                </div>
                <div className={styles.teamInfo}>
                  <h4>Emily Rodriguez</h4>
                  <p className={styles.teamRole}>Head of Design</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className={`${styles.teamCard} ${styles.fadeInUp}`} style={{ animationDelay: '0.3s' }}>
                <div className={styles.teamImage}>
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop"
                    alt="Team member"
                  />
                  <div className={styles.teamOverlay}>
                    <div className={styles.socialLinks}>
                      <a href="#" className={styles.socialLink}><i className="bi bi-linkedin"></i></a>
                      <a href="#" className={styles.socialLink}><i className="bi bi-twitter"></i></a>
                      <a href="#" className={styles.socialLink}><i className="bi bi-github"></i></a>
                    </div>
                  </div>
                </div>
                <div className={styles.teamInfo}>
                  <h4>David Park</h4>
                  <p className={styles.teamRole}>Lead Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </section>
  );
};

export default About;
