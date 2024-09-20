const ApprovedWithdrawal = require('../models/ApprovedWithDrawMode')
// Define your controller function
exports.createApprovedWithdrawal = async (req, res) => {
    try {
        // Extract the receipts_url and transaction_id from req.body
        const { receipts_url, account_number,user_name,user_cnic } = req.body;
        console.log(req.body)
        // Store the data in the database
        // Replace 'YourModel' with your actual database model or connection
        await ApprovedWithdrawal.create({ receipts_url, account_number,user_name,user_cnic });

        // Send a success response
        res.status(200).json({ message: 'Approved withdrawal created successfully' });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal server error' });
    }
};

 
exports.getAllApprovedWithdrawals = async (req, res) => {
    try {
        // Retrieve all approved withdrawals from the database
        // Replace 'YourModel' with your actual database model or connection
        const withdrawals = await ApprovedWithdrawal.find();

        // Send the retrieved withdrawals as a response
        res.status(200).json(withdrawals);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getApprovedWithdrawalById = async (req, res) => {
    try {
        // Extract the withdrawal id from req.params
        const { id } = req.params;
        console.log(id)
        const withdrawal = await ApprovedWithdrawal.findById(id);

        // If the withdrawal is not found, return a 404 response
        if (!withdrawal) {
            return res.status(404).json({ message: 'Approved withdrawal not found' });
        }

        // Send the retrieved withdrawal as a response
        res.status(200).json(withdrawal);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};