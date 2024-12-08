const ProfitLoss = require('../models/ProfitLossModel')
const Donation = require("../models/MemberDonation")
const ProfitLossEntry = require("../models/ProfitLossEntryModel")
const Projects = require("../models/ProjectModel")
const Users = require("../models/signinModel")
//const ProfitLoss = require('../models/ProfitLoss'); // Adjust the path to your ProfitLoss model

exports.gettingAllProfitsAndLoss = async (req, res) => {
    try {
        const { user_id } = req.body;
        console.log(user_id);
  const entries = await ProfitLoss.find({ user_id });
 let totalProfit = 0;
        let totalLoss = 0;

        entries.forEach((entry) => {
            totalProfit += entry.profit_amount || 0;
            totalLoss += entry.loss_amount ;
        });
        res.json({
            totalProfit,
            totalLoss,
            net_profit: totalProfit + totalLoss
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




exports.subtractAmountFromProfit = async (req, res, next) => {
    try {
        const { user_id, amount } = req.body;
        console.log(user_id, amount);

        // Fetch the profit entry for the given user
        const profitEntry = await ProfitLoss.findOne({ user_id, net_profit: { $gte: amount } });

        if (profitEntry) {
            // Subtract the amount from the profit entry
            profitEntry.profit_amount -= amount;
            profitEntry.net_profit -= amount;
            await profitEntry.save();

            res.json({ message: "Amount subtracted from profit entry" });
        } else {
            res.json({ message: "Amount is greater than net profit" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




exports.subtractAmountFromDonation = async (req, res, next) => {
    try {
        const { user_id, donation_amount ,donation_id } = req.body;
        console.log(donation_id);

        // Fetch the profit entry for the given user
        const profitEntry = await ProfitLoss.findOne({ user_id });

        if (profitEntry) {
            // Subtract the donation amount from the profit entry
            profitEntry.profit_amount -= donation_amount;
            profitEntry.net_profit -= donation_amount;
            await profitEntry.save();
            const donation = await Donation.findByIdAndDelete({ _id:donation_id})
            res.json({ message: "Donation amount subtracted from profit entry" });
        } else {
            res.json({ message: "No profit entry found for the user" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



exports.createProfitLossEntry = async (req, res, next) => {
    try {
        const { user_id, project_id, amount, invested_amount, profit_amount, loss_amount } = req.body;

        // Log the incoming data to ensure all required fields are being received
        console.log('Received Data:', { user_id, project_id, amount, invested_amount, profit_amount, loss_amount });

        // Create a new profit/loss entry
        const newEntry = new ProfitLossEntry({
            user_id,
            project_id,
            amount, // Total profit/loss amount (can be positive or negative)
            invested_amount, // Total capital invested
            profit_amount, // Profit amount (positive value if it's a profit, else 0)
            loss_amount, // Loss amount (positive value if it's a loss, else 0)
            createdAt: new Date(), // Timestamp
        });

        // Save the entry to the database
        const savedEntry = await newEntry.save();

        // Log the saved entry for debugging purposes
        console.log('Saved Entry:', savedEntry);

        // Send a success response
        res.json({
            message: "Profit/loss entry created successfully",
            data: savedEntry,
        });
    } catch (error) {
        console.error('Error creating profit/loss entry:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



exports.getAllProfitLossEntries = async (req, res, next) => {
    try {

        // Fetch all profit and loss entries for the given user
        const entries = await ProfitLossEntry.find().populate("user_id").populate("project_id");

        res.json({ entries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
