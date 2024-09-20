const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
    },
    invested_amount: {
        type: Number,
    },
    profit_earned: {
        type: Number,
    },
    loss:{
        type: Number,
    },
    investment_frequency: {
        type: String,
    },
    next_investment: {
        type: String,
    },
    is_active: {
        type: Boolean,
        default: false
    },
    with_draw: {
        type: Boolean,
        default: false
    }
});

const InvestmentProfileModel = mongoose.model('InvestmentProfile', investmentSchema);

module.exports = InvestmentProfileModel;