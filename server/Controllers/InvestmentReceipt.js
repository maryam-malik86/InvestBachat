const Receipt = require('../models/InvestmentReciptModel')
const users = require('../models/signinModel')
exports.createReceipt = async (req, res,next) => {
    try {
        const { receipt_path, user_id, investment_id,investment_profile_id,receipt_id,is_deleted } = req.body;
       
        if(!receipt_path || !investment_id){
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new receipt entry in the database
        const newReceipt = await Receipt.create({
            receipt_path,   
            user_id,
            investment_id,
            investment_profile_id,
            receipt_id,
            is_deleted
        });

        res.status(201).json(newReceipt);
    } catch (error) {
 
        res.status(500).json({ error: 'Failed to create receipt entry' });
    }
};


exports.getAllReceipts = async (req, res,next) => {
    try {
        // Fetch all receipts from the database
        const receipts = await Receipt.find().populate('user_id');

        res.status(200).json(receipts);
    } catch (error) {
  
        res.status(500).json({ error: 'Failed to fetch receipts' });
    }
};


exports.getReceiptById = async (req, res,next) => {
    try {
        const receiptId = req.params.id;

        // Fetch the receipt with the specified ID from the database
        const receipt = await Receipt.findById(receiptId).populate('user_id');

        if (!receipt) {
            return res.status(404).json({ error: 'Receipt not found' });
        }

        res.status(200).json(receipt);
    } catch (error) {
        
        res.status(500).json({ error: 'Failed to fetch receipt' });
    }
};

exports.deleteReceipt = async (req, res, next) => {
  
  try {
      const receiptId = req.params.id;  
      const deletedReceipt = await Receipt.findByIdAndDelete(receiptId);
      if (!deletedReceipt) {
        return res.status(404).json({ error: 'Receipt not found' });
      }
  
      res.status(200).json({ message: 'Receipt deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete receipt' });
    }  
  };
  
  
exports.updateReceiptIsDeleted = async (req, res,next) => {
    try {
        const { id } = req.body;

        // Update the is_deleted value of the receipt with the specified ID
        const updatedReceipt = await Receipt.findByIdAndUpdate(id, { is_deleted: true }, { new: true });

        if (!updatedReceipt) {
            return res.status(404).json({ error: 'Receipt not found' });
        }

        res.status(200).json(updatedReceipt);
    } catch (error) {

        res.status(500).json({ error: 'Failed to update receipt' });
    }
};

exports.updateReceiptId = async (req, res, next) => {
    try {
        const { id, receipt_id } = req.body;
        console.log(req.body)
        // Update the receipt_id value of the receipt with the specified ID
        const updatedReceipt = await Receipt.findByIdAndUpdate(id, { receipt_id }, { new: true });
        if (!updatedReceipt) {
            return res.status(404).json({ error: 'Receipt not found' });
        }
        res.status(200).json(updatedReceipt);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update receipt ID' });
    }
};

exports.getReceiptDetailsById = async (req, res, next) => {
    try {
        const receiptId = req.params.id;
      
        // Fetch the receipt with the specified ID from the database and populate investment_amount_profile and investment_id
        const receipt = await Receipt.findById(receiptId).populate({
            path: 'investment_profile_id',
            populate: {
                path: 'project_id'
            }
        })
        .populate('investment_id');;
        if (!receipt) {
            return res.status(404).json({ error: 'Receipt not found' });
        }
        res.status(200).json(receipt);
    } catch (error) {
       
        res.status(500).json({ error: 'Failed to fetch receipt details' });
    }
};

exports.getReceiptsByInvestmentProfileIds = async (req, res, next) => {
    try {
        const { investmentProfileIds } = req.body;
        // Find all receipts that match the given investment profile IDs
        const receipts = await Receipt.find({ investment_profile_id: { $in: investmentProfileIds } }).populate('user_id');
        res.status(200).json(receipts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch receipts' });
    }
};