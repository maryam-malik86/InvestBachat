const mongoose = require('mongoose');

// Define the schema for the ApprovedWithdrawal model
const approvedWithdrawalSchema = new mongoose.Schema({
    receipts_url: {
        type: String,
        required: true
    },
    account_number: {
        type: Number,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_cnic: {
        type: String,
        required: true
    }
});

// Create the ApprovedWithdrawal model
const ApprovedWithdrawal = mongoose.model('ApprovedWithdrawal', approvedWithdrawalSchema);

module.exports = ApprovedWithdrawal;