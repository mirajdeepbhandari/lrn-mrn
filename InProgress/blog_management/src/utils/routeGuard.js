import {getItem} from "./session"
import * as jose from 'jose'

const isLoggedIn = () =>{
    const token = getItem("access_token");
    if(!token) return false;
    try {
        const {exp} = jose.decodeJwt(token);
        const currentTime = Math.floor(new Date().getTime() / 1000);
        const isTokenExpired = exp < currentTime;
        if(isTokenExpired) return false;
        return true;
    } catch (error) {
        const error_msg = error.toString() || "uanable to decode access token";
        console.log(error_msg);
        return false; // if the token is fake whhich cant run jose.decodeJwt
    }
}


const isValidRole = (allowedRoles = ["admin", "user"]) => {
  const token = getItem("access_token");
  if (!token) return false;

  try {
    const decoded = jose.decodeJwt(token);
    const userRoles = decoded?.data?.roles;

    if (!Array.isArray(userRoles)) return false;

    // Check if user has at least one matching role
    return userRoles.some(role => allowedRoles.includes(role));
  } catch (error) {
    console.error("JWT decode error:", error.toString() || "Unable to decode access token");
    return false;
  }
};

const getRole = () => {
  const token = getItem("access_token");
  try{
    const decoded = jose.decodeJwt(token);
    const userRoles = decoded?.data?.roles;
    const role = userRoles[0];
    return role
  }catch(error){
    console.error("JWT decode error:", error.toString() || "Unable to decode access token");
  }
}


export {isLoggedIn, isValidRole, getRole};