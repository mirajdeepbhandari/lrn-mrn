import { useState } from "react";
import instance from '/src/utils/axios.js';
import { URLS } from '../constants/index';
import {setToken, setItem} from '../utils/session';
import { useNavigate } from 'react-router';
import {getRole} from "../utils/routeGuard"

const useLogin = (setWarning) => {
  const  navigate = useNavigate();
  const [payload, setPayload] = useState({email: "", password: ""});
  const [isDisabled, setIsDisabled] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMssg, setSuccessMssg] = useState("");

    const handleSubmit = async () =>{
      try{
        // to check if email and password are empty
        if (!payload.email.trim() || !payload.password.trim()) {
        setError("Please fill in both email and password.");
        return;
        }
  
        // 🔹 Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(payload.email)) {
          setError("Please enter a valid email address.");
          return;
        }
        setWarning("");
        setLoading(true);
        setIsDisabled(true); 
        setError("");
        await new Promise(resolve => setTimeout(resolve, 2000));
        const result = await instance.post(URLS.LOGIN, payload);
        setToken(result?.data?.data?.accessToken);
        setItem(
        "currentUser",
        JSON.stringify({name: result?.data?.data?.name, email: result?.data?.data?.email}));
        setSuccessMssg(result?.data?.msg);
        setTimeout(() => {
        setSuccessMssg("");
        setPayload({email: "", password: ""});
        if (getRole() === "user") {
          navigate("/");
        }else{
           navigate("/admin");
        }
       
        },1000);
      }catch(error){
        setSuccessMssg("");
        setWarning("");
        const errorMessage = error?.response?.data?.msg.toString() || "An error occurred";
        setError(errorMessage);
      }
      finally{
        setLoading(false);
        setIsDisabled(false);
      }
    }
  
 return{isDisabled, isloading, error, successMssg, payload, setPayload, handleSubmit};
}

export default useLogin