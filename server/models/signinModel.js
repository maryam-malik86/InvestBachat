const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = mongoose.Schema({
  // name, email, password, role
  fullName: {
    type: String,
    required: true,
    trim: true, // taky jo blank spaces ayain ya usa remove kr da
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  cnicNumber: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
  },
  optionalMobileNumber: {
    type: String,
  },
  email: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Member', 'User'],
    default: 'User',
},
  gender: {
    type: String,
  },
  kinName: {
    type: String,
  },
  kinCnic: {
    type: String
  },
  kinMobileNumber: {
    type: String,
  },
  kinAnotherNumber: {
    type: String,
  },
  kinEmail: {
    type: String,
  },
  secondkinName: {
    type: String,
  },
  secondkinCnic: {
    type: String
  },
  secondkinMobileNumber: {
    type: String,
  },
  secondkinAnotherNumber: {
    type: String,
  },
  secondkinEmail: {
    type: String,
  },
  IsEmailVerified: {
    type: Boolean,
    default: false,
  },
  EmailVerificationToken: {
    type: String,
  },
  EmailVerificationTokenExpires: {
    type: Date,
  },
  isActive:{
    type:Boolean,
    default:false
  
  }
});

UserSchema.methods.createEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.EmailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  this.EmailVerificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

  return verificationToken;
};

module.exports = mongoose.model("users", UserSchema);
