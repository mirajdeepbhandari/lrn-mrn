const {Schema, model} = require('mongoose');

const userSchema = new Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    password: { type: String, required: true },
    roles: {
      type: [String],
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    isEmailVerified: { type: Boolean, default: false }, // false
    isActive: { type: Boolean, default: true }, // Blocked or not?
    bio: { type: String },
    image: { type: String },
    token: { type: String }, // 123456
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
 