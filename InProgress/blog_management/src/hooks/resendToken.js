import instance from '/src/utils/axios.js';
import { URLS } from '../constants/index';
import { useState } from 'react';
  
  const useResendToken = (payload) =>{
   const [error, setError] = useState("") ;
   const [successMssg, setSuccessMssg] = useState("");
  
  const resendOPT = async (e, url=URLS.RESEND_EMAIL) =>{
    e.preventDefault();
    try{
        let result;
        setError("");
        if (url === URLS.RESEND_EMAIL){
            result = await instance.patch(url, {"email":payload.email});
        }
        else{
             result = await instance.post(url, {"email":payload.email});
        }
        
        setSuccessMssg(result?.data?.msg);
        setTimeout(() => {
            setSuccessMssg("");
        }, 3000);

    }catch(error){
        setSuccessMssg("");
        setError(error?.response?.data?.msg || "Something went wrong. Please try again later.");
    }
  }

  return {error, successMssg, setSuccessMssg, setError, resendOPT};

}

export default useResendToken