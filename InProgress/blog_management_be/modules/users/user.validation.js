const { token } = require("morgan");
const usersModel = require("./users.model");
const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .pattern(/[\w\s]/)
    .min(3)
    .max(50)
    .optional(),
  bio: Joi.string()
    .pattern(/[\w\s]/)
    .min(3)
    .max(500)
    .optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "io"] },
    })
    .required().
    error(new Error("Please provide a valid email address having domain .com or .io")),

  image: Joi.any().optional()
    .error(new Error("Something went wrong for image, please try again.")),

password: Joi.string()
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]:;\"'<>,.?/~`|\\\\]).{8,30}$"))
  .required()
  .error(new Error("Password must be 8-30 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character")),
});



const registerValidation = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
   return next({ status: 400, message: error.message });
  }
  // checking user exists or not of not model simply return so no upload of file happens
  const userExists = await usersModel.findOne({ email: req.body.email }).select("-password").select("-roles");
  if (userExists) {
    return next({ status: 400, message: 'Email already exists! Please choose another one.' });
  }
  next();
};

const changePasswordSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "io"] },
    })
    .required()
    .error(new Error("Please provide a valid email address having domain .com or .io")),
  oldPassword: Joi.string(),
  token: Joi.string(),
  newPassword: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]:;\"'<>,.?/~`|\\\\]).{8,30}$"))
    .required()
    .error(new Error("New password must be 8-30 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character")),
});

const changePasswordValidation = (req, res, next) => {
  const { error } = changePasswordSchema.validate(req.body);
  if (error) {
    return next({ status: 400, message: error.message });
  }
  next();
};

module.exports = { registerValidation, changePasswordValidation };