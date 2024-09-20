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
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
       type:String
    }
});

const ProfitLossEntry = mongoose.model('ProfitLossEntry', profitLossEntrySchema);

module.exports = ProfitLossEntry;