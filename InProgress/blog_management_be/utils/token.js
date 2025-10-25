const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateRandomToken = () => crypto.randomInt(100000, 999999);

const generateJWT = (payload) => {
    return jwt.sign(
        { data: payload },
        process.env.JWT_SECRET,
        {
            algorithm: process.env.JWT_ALGORITHM,
            expiresIn: process.env.JWT_DURATION
        }
    );
}

const verifyJWT =(token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { generateRandomToken, generateJWT, verifyJWT };