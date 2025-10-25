const fs = require('fs');
const path = require('path');
const {verifyJWT} = require("./token");
const userModel = require("../modules/users/users.model");

const delete_file = (req) =>{
       if (req.file && req.file.path) {
          const filePath = path.resolve(req.file.path); 

          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("Uploaded file deleted due to missing access token");
            }
          });
        }
}
const secureAPI = (sysRoles = []) =>{
    return async (req, res, next) => {
           console.log("file:", req.file)
     try {   
       const {access_token = null} =  req.headers;
        if (!access_token){
             delete_file(req);
             return next({status: 401, message: 'Access token is missing'});
        }
        const {data:jwtencodeddata, exp} = verifyJWT(access_token);
        console.log("jwtencodeddata:", jwtencodeddata);
        if (!jwtencodeddata){
            delete_file(req);
            return next({status: 401, message: 'Invalid access token'});
        } 
        const currentTime = Math.ceil(Date.now() / 1000);
        if (currentTime > exp) {
            delete_file(req);
            return next({status: 401, message: 'Access token is expired'});
        }
        const  {email, roles} = jwtencodeddata;
        const user = await userModel.findOne({email, isActive: true, isEmailVerified: true});
        if (!user){
             delete_file(req);
             return next({status: 401, message: 'User not found or inactive'});
        }
             
        if (req.body){
           req.body.currentUser = user._id;
        }
        else{
            req.currentUser = user._id;
        }
        if (sysRoles.length === 0) return next(); // if no role is specified, allow all authenticated users

        const hasRole = roles.some(x => sysRoles.includes(x));
        if (!hasRole){
           delete_file(req);
           return next({status: 403, message: 'You are not authorized to access this resource'});
        } 
        if (req.body) {
            req.body.currentUser = user._id; // attach user info to request object
        }
        else {
            req.currentUser = user._id;
        }
        next();
    }  
    catch (e) {
        next(e);
    }
}
}

module.exports = { secureAPI };