const mongoose = require('mongoose');

const profitLossEntrySchema = new mongoose.Schema({
    user_id: {
        // type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    },  
    profit_amount: {
        type: Number,
        required: true,
        default: 0
    },
    invested_amount: {
        type: Number,
        required: true,
        default: 0
    },
    loss_amount: {
        type: Number,
        required: true,
        default:0
    },
    createdAt: {
       type:String
    }
});

const ProfitLossEntry = mongoose.model('ProfitLossEntry', profitLossEntrySchema);

module.exports = ProfitLossEntry;