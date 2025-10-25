import "./Email_Verification.css"
import { Link } from 'react-router';
import { useState} from "react"
import instance from '../../utils/axios';
import { URLS } from '../../constants/index';
import { useNavigate } from 'react-router';
import AlertBox from '../../components/AlertBox';

const Forget_Password = () => {
  const  navigate = useNavigate();
  const [payload , setPayload] = useState({email: ""});
  const [error, setError] = useState("");
  const [successMssg, setSuccessMssg] = useState("");
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      setError("");
      const result = await instance.post(URLS.VERIFY_EMAIL_PASSWORD, payload);
      setSuccessMssg(result?.data?.msg);
      setTimeout(() => {
        navigate("/auth/set-new-password", {state: {email: payload.email}});
        setSuccessMssg("");
      }, 1000);
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
            <h2>Enter Your Email</h2>
            <p>We will send a verification code to your email address. Please enter it below to continue.</p>
        </div>

         {error && <AlertBox errorMsg={error} type="danger"></AlertBox>}
        {successMssg && <AlertBox errorMsg={successMssg} type="success"></AlertBox>}

        <form id="verifyForm">
            <div className="otp-input-group">
                <label for="otpInput">Enter Your Email</label>
                <input 
                    type="text" 
                    id="otpInput" 
                    className="otp-input-text" 
                    required
                    onChange={(e)=> setPayload(() => ({email: e.target.value })) }
                />
            </div>

            <button type="submit" className="verify-btn" onClick={(e)=>handleSubmit(e) }>Send Verification Code</button>
        </form>

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

export default Forget_Password