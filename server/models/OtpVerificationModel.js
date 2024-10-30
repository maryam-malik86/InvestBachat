const mongoose = require('mongoose');

const otpVerificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // this is the duration in seconds after which the OTP will be deleted automatically
    }
});

const OtpVerificationModel = mongoose.model('OtpVerification', otpVerificationSchema);

module.exports = OtpVerificationModel;