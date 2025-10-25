 import {useRef, useState} from 'react';
 import instance from '/src/utils/axios.js';
 import { URLS } from '../constants/index';
 import { useNavigate } from 'react-router';
 
 const useRegister = () => {
    const registerRef = useRef(null);
    const [error, setError] = useState("");
    const [successMssg, setSuccessMssg] = useState("");
    const  navigate = useNavigate();

 const handleSubmit = async(e) => {
        e.preventDefault();
        const createbutton = document.getElementById("registerBtn");
        createbutton.disabled = true;
        try{
            setError("");
            const rawData = registerRef.current;
            const formData = new FormData(rawData);

            // Convert FormData to plain JSON
            const jsonData = Object.fromEntries(formData.entries());
            //check password and confirm password
            if (jsonData.password !== jsonData.cpassword) {
                setError("Password and confirm password do not match.");
                createbutton.disabled = false; // re-enable button
                return;
            }

            // remove cpasssword
            delete jsonData.cpassword;

            // Send JSON to backend
           const result = await instance.post(
            URLS.REGISTER,
            jsonData, 
            {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            }
            );

            setSuccessMssg(result?.data?.msg);
            setTimeout(() => {
                setSuccessMssg("");
                createbutton.disabled = false;

                navigate("/auth/verify-email" , {state: {email: jsonData.email}});
            }, 2000);
        } catch(error){
            setSuccessMssg("");
            createbutton.disabled = false;
            const error_msg = error?.response?.data?.msg || "Something went wrong";
            setError(error_msg);
        }
    
    }

    return{registerRef, error, successMssg, handleSubmit};

}

export default useRegister