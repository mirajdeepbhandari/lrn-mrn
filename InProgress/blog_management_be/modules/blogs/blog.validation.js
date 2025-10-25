const Joi = require("joi");

const blogPostSchema = Joi.object({
  title: Joi.string()
    .pattern(/[\w\s]/)
    .min(5)
    .max(100)
    .required()
    .error(new Error("Title is required and must be 3-100 characters long")),

  content: Joi.string()
    .min(10)
    .required()
    .error(new Error("Content is required and must be at least 10 characters long")),
  
  currentUser: Joi.any()

});

// Validation middleware
const blogPostingValidation = (req, res, next) => {
  const { error } = blogPostSchema.validate(req.body);
  if (error) {
    return next({ status: 400, message: error.message });
  }
  next();
};

module.exports = { blogPostingValidation };
