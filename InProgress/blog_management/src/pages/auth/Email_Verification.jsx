import "./Email_Verification.css"
import { Link, useLocation } from "react-router"
import { useState, useEffect } from "react"
import instance from '../../utils/axios';
import { URLS } from '../../constants/index';
import { useNavigate } from 'react-router';
import AlertBox from '../../components/AlertBox';
import useResendToken from '../../hooks/resendToken';

const Email_Verification = () => {
  const  navigate = useNavigate();
  const location = useLocation();
  const [payload, setPayload] = useState({ email: "", token: "" });
  const {error, successMssg, setSuccessMssg, setError, resendOPT} = useResendToken(payload);


  useEffect(() => {
  // Compare window path and location path
  if (window.location.pathname === location.pathname && location?.state?.email) {
    setPayload((prev) => ({ ...prev, email: location.state.email }));
  }
}, [location.pathname, location?.state?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(payload);
    try {
        setError("");
        const result = await instance.post(URLS.VERIFY_EMAIL, payload);
        setSuccessMssg(result?.data?.msg);
        setTimeout(() => {
            setSuccessMssg("");
            navigate("/auth/login");
        }, 3000);
      
    } catch (error) {
      const error_message = error?.response?.data?.msg || "Something went wrong. Please try again later.";
      setError(error_message);

    }
  };

  return (
    <div className="verification-body">
      <div className="verify-container">
        <div className="verify-header">
          <div className="verify-icon">
            <i className="bi bi-envelope-check"></i>
          </div>
          <h2>Verify Your Email</h2>
          <p>We've sent a verification code to your email address. Please enter it below to continue.</p>
        </div>

        {error && <AlertBox errorMsg={error} type="danger"></AlertBox>}
        {successMssg && <AlertBox errorMsg={successMssg} type="success"></AlertBox>}

        <div className="email-display" id="emailDisplay">
          {payload.email}
        </div>

        <form id="verifyForm">
          <div className="otp-input-group">
            <label htmlFor="otpInput">Enter Verification Code</label>
            <input
              type="text"
              id="otpInput"
              className="otp-input"
              placeholder="000000"
              maxLength="6"
              inputMode="numeric"
              required
              onChange={(e) =>
                setPayload((originalPayload) => ({
                  ...originalPayload,
                  token: e.target.value,
                }))
              }
            />
          </div>
          <button type="submit" className="verify-btn" onClick={(e)=>handleSubmit(e)}>
            Verify Email
          </button>
        </form>

        <div className="resend-section">
          <div className="resend-text">Didn't receive the code?</div>
          <button type="button" className="resend-btn" id="resendBtn" onClick={(e) => resendOPT(e)}>
            Resend Code
          </button>
          <div className="timer" id="timer"></div>
        </div>

        <div className="back-link">
          <Link to="/auth/login">
            <i className="bi bi-arrow-left"></i>
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Email_Verification;
