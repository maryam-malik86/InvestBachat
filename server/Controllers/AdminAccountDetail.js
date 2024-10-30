const BankDetails = require("../models/BankDetailsModel");

// Import the necessary modules and models

// Create a new bank account entry in the database
exports.createBankAccount = async (req, res , next) => {
  try {
    // Extract the required fields from req.body
    const { bank_logo,
        bank_name,
        account_no
         } = req.body;

    // Create a new BankAccount instance
    const bankAccount = new BankDetails({
        bank_logo,
        bank_name,
        account_no
        
    });

    // Save the bank account entry to the database
    await bankAccount.save();

    // Return a success response
    res.status(201).json({ message: "Bank account created successfully" });
  } catch (error) {
    // Return an error response
    res.status(500).json({ error: "Failed to create bank account" });
  }
};

exports.gettingBankAccount = async (req, res , next) => {
    try {
        const bankAccount = await BankDetails.find();
        res.status(200).json({ bankAccount });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch bank account" });
    }
    };
