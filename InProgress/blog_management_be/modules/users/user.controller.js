const userModel = require('./users.model');
const {hashPassword, comparePassword} = require('../../utils/bcrypt');
const { sendMail } = require('../../services/mailer');
const giveEmail = require('../../utils/email_template');
const { generateRandomToken, generateJWT } = require('../../utils/token');

const register = async(payload)=> {
   const {roles, password, ...rest} = payload;
   rest.password = hashPassword(password);
   const tokenNumber = generateRandomToken();
   rest.token = tokenNumber;
   const user = await userModel.create(rest);
   await sendMail({
    to: user.email,
    subject: "Welcome to Blog App",
    message: giveEmail(rest, tokenNumber)});

};

const login = async (payload) => {
   const { email, password } = payload;
   const user = await userModel.findOne({email});
   if (!user) throw new Error('User not found');

   const isValidPassword = comparePassword(password, user.password);
   if (!isValidPassword) throw new Error('Email or password is incorrect! please try again.');
   
   if (!user.isActive) throw new Error('User id is banned! please contact admin');
   if (!user.isEmailVerified) throw new Error('Please verify your email to login');
   
   //token generation 
   const JwtPayload = {name: user.name, email: user.email, roles: user.roles};
   const accessToken = generateJWT(JwtPayload);
   const userData = {name: user.name, email: user.email, accessToken: accessToken};
   return userData;
};

const verifyEmail = async (payload) => {
    const { email, token } = payload;
    const user = await userModel.findOne({email, isActive: true});
    if (!user) throw new Error('User not found');
    if (user.token.toString() !== token.toString()) throw new Error('Invalid token');
    const updateUser = await userModel.updateOne({email}, {isEmailVerified: true, token: ""});
    if (updateUser.modifiedCount === 0) throw new Error('Email verification failed, please try again');
    return "Email verified successfully";
};

const generateFPToken = async (email) =>{

    if (!email) throw new Error('Email is required');
     const user = await userModel.findOne({email, isActive: true, isEmailVerified: true});
     if (!user) throw new Error('User not found or not active or email not verified');
     const tokenNumber = generateRandomToken();
     const updateUser = await userModel.updateOne({email}, {token: tokenNumber});
     if (updateUser.modifiedCount === 0) throw new Error('Failed to generate password reset token, please try again');
     else {
     await sendMail({
         to: user.email,
         subject: "Password Reset",
         message: `<h4>Your password reset token is: ${tokenNumber}</h4>`
     });
     return "Password reset email sent successfully";
};

}


const verifyFPToken = async (payload) =>{
 const {email, token, newPassword} = payload;
 const userData = await userModel.findOne({email});
 if (!userData) throw new Error('User not found');
 const {token: storedToken} = userData;
 if (token.toString() !== storedToken.toString()) throw new Error('Invalid Verification Code');
 const hashedPassword = hashPassword(newPassword);
 const updateUser = await userModel.updateOne({email}, {password: hashedPassword, token: ""});
 if (updateUser.modifiedCount === 0) throw new Error('Failed to reset password, please try again');
 return "Password reset successfully";
}


const changePassword = async (payload) =>{
    const {currentUser, oldPassword, newPassword} = payload;
    const user = await userModel.findById(currentUser);
    if (!user) throw new Error('User not found');
    const isValidPassword = comparePassword(oldPassword, user.password);
    if (!isValidPassword) throw new Error('Enter the correct old password');
    const hashedPassword = hashPassword(newPassword);
    const updateUser = await userModel.updateOne({_id: currentUser}, {password: hashedPassword});
    if (updateUser.modifiedCount === 0) throw new Error('Failed to change password, please try again');
    return "Password changed successfully";
    
}

const resetPassword = async (payload) =>{
    const {email, newPassword} = payload;
    const user = await userModel.findOne({email});
    if (!user) throw new Error('User not found');
    const hashedPassword = hashPassword(newPassword);
    const updateUser = await userModel.updateOne({email}, {password: hashedPassword});
    if (updateUser.modifiedCount === 0) throw new Error('Failed to reset password, please try again');
    return "Password reset successfully";
}

const blockUnblockUser = async (userId) => {
    // Validate user existence
    const user = await userModel.findById(userId);
    if (!user) throw new Error('User not found');

    // Toggle the user's active status
    const updated = await userModel.updateOne(
        { _id: userId },
        { isActive: !user.isActive }
    );

    if (updated.modifiedCount === 0) {
        throw new Error('Failed to update user status, please try again');
    }

    return true;
};


const getbyId = async (userId) => {
    const user = await userModel.findById(userId).select('-password -token');
    if (!user) throw new Error('User not found');
    return user;
}

const listAllUsers = async (search, page=1, limit=5) => {
    // use aggregation for search, pagination
    const query = [];

    //Search
    if (search?.name) {
    query.push({
        $match: {
        name: { $regex: search.name, $options: "i" } // case-insensitive search
        }
    });
    }

    //Filter by role
    if (search?.role) {
        query.push({
            $match: {
                roles: search.role,
            },
        });
    }

    // Build the aggregation query
    query.push(
    {
        $facet: {
        metadata: [
            { $count: "total" }
        ],
        data: [
            { $skip: (+page - 1) * +limit },
            { $limit: +limit }
        ]
        }
    },
    {
        $addFields: {
        total: {
            $arrayElemAt: ["$metadata.total", 0]
        }
        }
    },
    {
        $project: {
        "data.password": 0 // Exclude password field from results
        }
    }
    );

    // Run the aggregation query
    const result = await userModel.aggregate(query);

    // Format and return the result
    return {
    total: result[0]?.total || 0,
    data: result[0]?.data || [],
    page: +page,
    limit: +limit
    };

}

const getProfile = async (userId) => {
    const user = await userModel.findById(userId).select('-password -token');
    if (!user) throw new Error('User not found');
    return user;
}

const updateRoles = async (userId, payload) => {
    const user = await userModel.findById(userId);
    if (!user) throw new Error('User not found');
    const { roles } = payload;
    const newRoles = [...roles]
    if (newRoles.length === 0) throw new Error('At least one role must be there');
    const allowedRoles = ['admin', 'user'];
    const isValidRoles = newRoles.every(role => allowedRoles.includes(role));
    if (!isValidRoles) throw new Error('Invalid roles provided');
    const updateUser = await userModel.updateOne({ _id: userId }, { roles: newRoles });
    if (updateUser.modifiedCount === 0) throw new Error('Failed to update user roles, please try again');
    return "User roles updated successfully";
}

const resendVerificationToken = async (email) => {
    console.log("yei aai ra xa email ma", email);
    const user = await userModel.findOne({ email, isActive: true });
    if (!user) throw new Error('User not found');
    const tokenNumber = generateRandomToken();
    const updateUser = await userModel.updateOne({ email }, { token: tokenNumber });
    if (updateUser.modifiedCount === 0) throw new Error('Failed to generate verification token, please try again');
    else {
        await sendMail({
            to: user.email,
            subject: "Email Verification",
            message: giveEmail(user, tokenNumber)
        });
        return "Verification email sent successfully";
    }
}


module.exports = {generateFPToken, verifyFPToken, register, login, verifyEmail, changePassword,resetPassword, blockUnblockUser, getbyId, listAllUsers, getProfile, updateRoles, resendVerificationToken};


// same as above
// module.exports = {
//   register: register,
//   login: login
// };