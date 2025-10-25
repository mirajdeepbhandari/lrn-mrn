import styles from './Register.module.css';
import { Link } from 'react-router';
import AlertBox from '../../components/AlertBox';
import useRegister from '../../hooks/useRegister';
import useImageUpload from '../../hooks/imageUpload';

const Register = () => {
  const { registerRef, error, successMssg, handleSubmit } = useRegister();
  const { handleImageChange, imageName, preview, fileAttached, imageInputRef } = useImageUpload();

  return (
    <section className={styles.registerMainBody}>
      <div className={styles.registerContainer}>
        <div className={styles.registerCard}>
          <div className={styles.registerHeader}>
            <h1>Create Account</h1>
            <p style={{ color: "blue" }}>Join us today and get started</p>
          </div>

          {error && <AlertBox errorMsg={error} type="danger" />}
          {successMssg && <AlertBox errorMsg={successMssg} type="success" />}

          <form id="registerForm" ref={registerRef} onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className={styles.formControl}
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className={styles.formControl}
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type="password"
                  className={styles.formControl}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cpassword">Re Enter Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type="password"
                  className={styles.formControl}
                  id="cpassword"
                  name="cpassword"
                  placeholder="Repeat password"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Profile Picture</label>
              <div className={styles.imageUploadWrapper}>
                <label htmlFor="imageInput" className={styles.imageUploadLabel}>
                  <i className="bi bi-cloud-arrow-up"></i>
                  <span>Click to upload image</span>
                </label>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  name="image"
                  ref={imageInputRef}
                  onChange={(e) => handleImageChange({ event: e })}
                  style={{ display: "none" }}
                />
              </div>

              {/* Show image name */}
              {imageName && <p style={{ marginTop: "10px" }}>📁 {imageName}</p>}

              {/* Show image preview */}
              {preview && (
                <div className={styles.imagePreview} id="imagePreview">
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: "150px", marginTop: "10px", borderRadius: "8px" }}
                  />
                </div>
              )}
            </div>

            {fileAttached && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleImageChange({ removeImage: true })}
                >
                  <span className="bi bi-x"></span>
                </button>
              </div>
            )}

            <button type="submit" className={styles.registerBtn} id="registerBtn">
              Create Account
            </button>

            <div className={styles.loginLink}>
              Already have an account? <Link to="/auth/login">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
