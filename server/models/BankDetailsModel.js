const mongoose = require("mongoose");

const bankDetailsSchema = new mongoose.Schema({
    bank_logo: {
        type: String,
        required: true,
    },
    bank_name: {
        type: String,
        required: true,
    },
    account_no: {
        type: String,
        required: true,
    },
});

const BankDetailsModel = mongoose.model("BankDetails", bankDetailsSchema);

module.exports = BankDetailsModel;
