const mongoose = require('mongoose');

const profitLossSchema = new mongoose.Schema({
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    profit_loss_entry_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProfitLossEntry',
    },

    profit_amount: {
        type: Number,
        required: true,
        default: 0
    },
    loss_amount: {
        type: Number,
        required: true,
        default:0
    },
    net_profit:{
        type: Number,
        required: true,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

const ProfitLoss = mongoose.model('ProfitLoss', profitLossSchema);

module.exports = ProfitLoss;