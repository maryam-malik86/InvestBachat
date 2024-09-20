const Transaction = require("../models/verifiedReciptsModel");

// Import the necessary modules and dependencies

// Controller function to add a transaction ID to the database
exports.addTransactionId = async (req, res, next) => {
  const { transactionId } = req.body;
  console.log(req.body)
  try {
    // Check if the transaction ID already exists in the database
    const existingTransaction = await Transaction.findOne({ transactionId });

    if (existingTransaction) {
      return res.status(200).json({ error: "Transaction ID already exists" });
    }

    // Create a new transaction object and save it to the database
    const newTransaction = new Transaction({ transactionId });
    await newTransaction.save();

    return res
      .status(200)
      .json({ message: "Transaction ID added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to update the is_deleted value of a transaction ID
exports.updateTransactionId = async (req, res, next) => {
  const { id, is_deleted } = req.body;

  try {
    // Find the transaction by ID
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Update the is_deleted value to true
    transaction.is_deleted = is_deleted;
    await transaction.save();

    return res
      .status(200)
      .json({ message: "Transaction ID updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to update the receiptId of a transaction
exports.updateReceiptTransctionId = async (req, res, next) => {
  const { id, receiptId } = req.body;
  console.log(req.body);
  try {
    // Find the transaction by ID
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Update the receiptId value
    transaction.receiptId = receiptId;
    await transaction.save();

    return res.status(200).json({ message: "Receipt ID updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
