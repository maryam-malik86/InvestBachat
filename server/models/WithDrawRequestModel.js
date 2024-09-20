const mongoose = require('mongoose');

// Import the required modules

// Define the schema for the WithdrawRequestModel
const WithdrawRequestSchema = new mongoose.Schema({
    investment_profile_ids: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'InvestmentProfile',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    },  
    withdraw_type:{
        type: String,
    },
    withdraw_amount:{
        type: Number,
    },
    account_number:{
        type:Number
    },
    accountName:{
        type:String
    }
    // Add other fields as needed
});

// Create the WithdrawRequestModel using the schema
const WithdrawRequestModel = mongoose.model('WithdrawRequest', WithdrawRequestSchema);

// Export the model
module.exports = WithdrawRequestModel;