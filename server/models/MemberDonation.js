const mongoose = require('mongoose');

const memberDonationSchema = new mongoose.Schema({
    donation_amount: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status:{
        type: String,
        default: "pending"
    }
});

const Donation = mongoose.model('Donation', memberDonationSchema);

module.exports = Donation;