const WithDraw = require("../models/WithDrawRequestModel");
const ProftiLoss = require("../models/ProfitLossModel")
const Projects = require("../models/ProjectModel")
exports.getAllWithdraws = async (req, res) => {
    try {
        const withdraws = await WithDraw.find().populate("user_id")
        res.json(withdraws);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


exports.withdrawFindById = async (req, res) => {
    try {
        const { id } = req.params;
        const withdraw = await WithDraw.findById(id)
        .populate({
            path: 'investment_profile_ids',
            populate: [
                { path: 'user_id', model: 'users' }, // Populate user_id
                { path: 'project_id', model: 'Projects' } // Populate project_id
            ]
        })
        .populate("user_id")
        res.json(withdraw);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server error" });
    }
};


exports.withdrawFindByIdStatement = async (req, res) => {
    try {
        const { id } = req.params;
        const withdraw = await WithDraw.find({user_id: id}).populate("user_id").populate("project_id")
        
        res.status(200).json(withdraw);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server error" });
    }
};


exports.withdrawFindByIdAndDelete = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id)
        const withdraw = await WithDraw.findByIdAndDelete(id);
        if (!withdraw) {
            return res.status(404).json({ error: "Withdraw not found" });
        }
        res.json({ message: "Withdraw deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server error" });
    }
};