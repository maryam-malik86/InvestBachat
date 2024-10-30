const Donation = require("../models/MemberDonation") // Assuming you have a 'Donation' model
// const user = require("../models/signinModel")
// Create a new donation
exports.createDonation = async (req, res) => {
    try {
        const { donation_amount, user_id } = req.body;

        // Check if there is a pending donation for the user
        const pendingDonation = await Donation.findOne({ user_id, status: 'pending' });

        // If there is a pending donation, return a message asking to wait for previous approval
        if (pendingDonation) {
            return res.status(400).json({ message: 'Please wait for previous approval' });
        }

        // Create a new donation record in the database
        const donation = await Donation.create({ donation_amount, user_id });

        // Return the created donation as the response
        res.status(201).json(donation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAllDonations = async (req, res) => {
    try {
        // Fetch all donation records from the database and populate the 'user' field
        const donations = await Donation.find().populate("user_id")

        // Return the donations as the response
        res.status(200).json(donations);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};