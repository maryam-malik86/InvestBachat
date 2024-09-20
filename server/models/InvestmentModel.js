const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
    investment_profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InvestmentProfile',
        required: true
    },
    Investments: {
        investment_amount: {
            type: Number,
            required: true
        },
        investment_date: {
            type: String,
            required: true
        },
        investment_status: {
            type: String,
            enum: ['unpaid','paid'],
            default: 'unpaid'
        },
        is_active: {
            type: Boolean,
            default: false
        }
    }
});

const InvestmentsModel = mongoose.model('Investments', InvestmentSchema);

module.exports = InvestmentsModel;
