import styles from "./Login.module.css";
import { Link } from 'react-router';
import CustomButton from '../../components/CustomButton';
import AlertBox from '../../components/AlertBox';
import useLogin from '../../hooks/useLogin';
import { useState } from 'react';
import { useLocation } from "react-router";

const Login = () => {
  const location = useLocation();
  const [warning, setWarning] = useState(location?.state?.warn || "");
  const [seePassword, setSeePassword] = useState(false);
  const { setPayload, isDisabled, isloading, error, successMssg, handleSubmit, payload } = useLogin(setWarning);

  return (
    <div className={styles.loginBody}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h1>Welcome Back</h1>
            <p style={{ color: "blue" }}>Sign in to your account to continue</p>
          </div>

          {error === "Please verify your email to login" && (
            <AlertBox errorMsg={error} type="danger" link={true} extraData={payload.email}/>
          )}

          {error !== "Please verify your email to login" && error !== "" && (
            <AlertBox errorMsg={error} type="danger"/>
          )}

          {successMssg && (
            <AlertBox errorMsg={successMssg} type="success"/>
          )}

          {warning && (
            <AlertBox errorMsg={warning} type="warning"/>
          )}

          <form id="loginForm">
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email Address</label>
              <input
                type="email"
                className={styles.formControl}
                required
                onChange={(e) =>
                  setPayload((original_payload) => ({ ...original_payload, email: e.target.value }))
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <div className={styles.passwordWrapper} style={{ display: "flex", alignItems: "center" }}>
                <input
                  type={seePassword ? "text" : "password"}
                  id="passwordInput"
                  className={styles.formControl}
                  required
                  onChange={(e) =>
                    setPayload((original_payload) => ({ ...original_payload, password: e.target.value }))
                  }
                />
                <button
                  type="button"
                  onClick={() => setSeePassword(!seePassword)}
                  className={styles.passwordToggle}
                >
                  <i className={`bi ${seePassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
            </div>

            <div className={styles.forgotPassword}>
              <Link to="/auth/forget-password">Forgot password?</Link>
            </div>

            <CustomButton
              color="primary"
              customclass={styles.btnLogin}
              isdisabled={isDisabled}
              loading={isloading}
              onClick={handleSubmit}
            />

            <div className={styles.signupLink}>
              Don't have an account? <Link to="/auth/register">Sign up</Link>
            </div>
             <br/>
             <div className={styles.signupLink} style={{textAlign: "center", fontWeight: "bold"}}>
              Wanna Explore Blogs ? <Link to="/">Click Here</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
