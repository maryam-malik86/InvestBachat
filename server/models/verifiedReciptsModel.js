const mongoose = require('mongoose');

const verifiedreceiptsSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true
    }
});

const verifiedreceiptsModel = mongoose.model('verifiedreceipts', verifiedreceiptsSchema);

module.exports = verifiedreceiptsModel;