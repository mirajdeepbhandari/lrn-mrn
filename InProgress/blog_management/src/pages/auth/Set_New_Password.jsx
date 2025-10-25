import "./Email_Verification.css"
import {useState, useEffect} from "react"
import { useLocation, Link } from "react-router";
import instance from '../../utils/axios';
import { URLS } from '../../constants/index';
import { useNavigate } from 'react-router';
import AlertBox from '../../components/AlertBox';
import useResendToken from '../../hooks/resendToken';

const Set_New_Password = () => {
     const  navigate = useNavigate();
     const location = useLocation();
     const [payload , setPayload] = useState({email: location?.state?.email, token: "", newPassword: ""});
     const {error, successMssg, setSuccessMssg, setError, resendOPT} = useResendToken(payload);
     
      // runs on page load at once
     useEffect(() => {
        // Compare window path and location path
        if (!location?.state?.email) {
          navigate("/error/404");
        }
      }, [navigate, location?.state?.email]);


     const handleSumbit = async (e) => {
        e.preventDefault();
        try{
            setError("");
            const result = await instance.post(URLS.RESET_PASSWORD, payload);
            setSuccessMssg(result?.data?.msg);
            setTimeout(() => {
                navigate("/auth/login");
                setSuccessMssg("");
            }, 2000);
        }catch(error){
            setSuccessMssg("");
            const error_message = error?.response?.data?.msg || "Something went wrong. Please try again later.";
            setError(error_message);
        }
     }
    
  return (
    <section className="verification-body">
    <div className="verify-container">
        <div className="verify-header">
            <div className="verify-icon">
                <i className="bi bi-envelope-check"></i>
            </div>
            <h2>Enter Your New Password</h2>
            <p> Enter the new password you want to set along with the verification code sent to your email address</p>
        </div>

        {error && <AlertBox errorMsg={error} type="danger"></AlertBox>}
        {successMssg && <AlertBox errorMsg={successMssg} type="success"></AlertBox>}

        <form id="verifyForm">
            <div className="otp-input-group">
                <label for="EmailInput">Your Email</label>
                <input 
                    type="text" 
                    id="EmailInput" 
                    className="otp-input-text" 
                    placeholder={payload.email} 
                    required
                    disabled
                />
            </div>
            <div className="otp-input-group">
                <label for="otpInput">Enter Verification Code</label>
                <input 
                    type="text" 
                    id="otpInput" 
                    className="otp-input" 
                    placeholder="000000" 
                    maxlength="6"
                    inputmode="numeric"
                    required
                    onChange={(e)=> setPayload((prev)=>({...prev,token: e.target.value}))}
                />
            </div>
            <div className="otp-input-group">
                <label for="passwordInput">Enter New Password</label>
                <input 
                    type="text" 
                    id="passwordInput" 
                    className="otp-input-text" 
                    placeholder="" 
                    required
                    onChange={(e)=> setPayload((prev)=>({...prev,newPassword: e.target.value}))}
                />
            </div>

            <button type="submit" className="verify-btn" onClick={(e)=> handleSumbit(e)}>Change Password</button>
        </form>

        <div className="resend-section">
            <div className="resend-text">Didn't receive the code?</div>
            <button type="button" className="resend-btn" id="resendBtn" onClick={(e) => resendOPT(e, URLS.VERIFY_EMAIL_PASSWORD)}>
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
</section>
  )
}

export default Set_New_Password