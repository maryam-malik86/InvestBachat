const mongoose = require('mongoose');

const InvestmentReceiptSchema = new mongoose.Schema({
    receipt_path: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    investment_profile_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InvestmentProfile',
        required: true
    },
    investment_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Investments',
            required: true
        }
        
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    receipt_id:{
        type:String,
    },
    is_deleted: {
        type: Boolean,
        default: false
    }

});

const InvestmentReceipt = mongoose.model('InvestmentReceipt', InvestmentReceiptSchema);

module.exports = InvestmentReceipt;