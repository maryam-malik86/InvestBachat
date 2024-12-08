const cron = require('node-cron');
const InvestmentProfile = require('../models/InvestmentProfileModel');
const Project = require('../models/ProjectModel')
const ProfitLoss = require('../models/ProfitLossModel')
const InvestmentReceipt = require("../models/InvestmentReciptModel")
const Investments = require("../models/InvestmentModel")
const WithdrawRequest = require("../models/WithDrawRequestModel")
// Import necessary modules and models

// Controller function for creating an investment profile

// exports.createInvestmentProfile = async (req, res,next) => {
//     try {
//         // Extract data from the request body
//         const { user_id, project_id, invested_amount, profit_earned,loss, investment_frequency ,is_active,duration} = req.body;

//         const currentDate = new Date();
//         const investmentDate = new Date(currentDate);
//         if (duration === "12") {
//             investmentDate.setFullYear(currentDate.getFullYear() + 1);
//         } else {
//             investmentDate.setMonth(currentDate.getMonth() + Number(duration));
//             if (investmentDate.getDate() < currentDate.getDate()) {
//                 investmentDate.setDate(0); // Set to the last day of the previous month
//             }
//         }

//         // Format the date to display only the date part
//         const formattedDate = investmentDate.toISOString().split('T')[0];


//         // Create a new investment profile
//         const investmentProfile = new InvestmentProfile({
//             user_id,
//             project_id,
//             invested_amount,
//             profit_earned,
//             loss,
//             investment_frequency,
//             next_investment: formattedDate,
//             is_active,
//         });

//         // Save the investment profile to the database
//         await investmentProfile.save();

//         // Return a success response
//         res.status(201).json({ message: 'Investment profile created successfully' , data: investmentProfile});
//     } catch (error) {
//         // Handle any errors that occur during the process

//         res.status(500).json({ message: 'An error occurred while creating the investment profile' });
//     }
// };





// ----- ya wala asal wala ha jo ma use kr rha hoon

// exports.createInvestmentProfile = async (req, res, next) => {
//     try {
//         // Extract data from the request body
//         const {
//             user_id,
//             project_id,
//             invested_amount,
//             profit_earned,
//             loss,
//             investment_frequency,
//             is_active,
//             duration,
//             receipt_path,
//             receipt_id,
//             is_deleted,
//             investment_profile_id,
//             isSubmitted
//         } = req.body;
//         console.log(req.body)
//         // Create Investment Profile
//         const currentDate = new Date();
//         const investmentDate = new Date(currentDate);
//         if (duration === "12") {
//             investmentDate.setFullYear(currentDate.getFullYear() + 1);
//         } else {
//             investmentDate.setMonth(currentDate.getMonth() + Number(duration));
//             if (investmentDate.getDate() < currentDate.getDate()) {
//                 investmentDate.setDate(0); // Set to the last day of the previous month
//             }
//         }
//         const formattedDate = investmentDate.toISOString().split('T')[0];

//         const investmentProfile = new InvestmentProfile({
//             user_id,
//             project_id,
//             invested_amount,
//             profit_earned,
//             loss,
//             investment_frequency,
//             next_investment: formattedDate,
//             is_active,
//         });
//         await investmentProfile.save();
//         // Create Investment

//         const currentDateforInvestment = new Date();
//         const investmentDateforInvestment = new Date(currentDateforInvestment);
//         const formattedDateforInvestment = investmentDateforInvestment.toISOString().split("T")[0];

//         let investmentEntry;
//         if (isSubmitted) {
//              investmentEntry = new Investments({
//                 investment_profile_id: investmentProfile._id,
//                 Investments: {
//                     investment_amount: invested_amount,
//                     investment_date: formattedDateforInvestment,
//                     investment_status: "unpaid",
//                     is_active,
//                 },
//             });
//             await investmentEntry.save();
//         }
//         // Create Receipt
//         if (receipt_path && receipt_id) {
//             const newReceipt = await InvestmentReceipt.create({
//                 receipt_path,
//                 user_id,
//                 investment_id:investmentEntry._id,
//                 investment_profile_id: investmentProfile._id,
//                 receipt_id,
//                 is_deleted,
//             });
//             return res.status(201).json({ message: 'Combined data processed successfully', data: { investmentProfile, investmentEntry, newReceipt } });
//         }

//         res.status(400).json({ error: 'Invalid request. All required fields must be provided.' });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ error: 'An error occurred while processing the combined data' });
//     }
// };







exports.createInvestmentProfile = async (req, res, next) => {
    let investmentProfile;
    let investmentEntry;
    let newReceipt;

    try {
        // Extract data from the request body
        const {
            user_id,
            project_id,
            invested_amount,
            profit_earned,
            loss,
            investment_frequency,
            is_active,
            duration,
            receipt_path,
            receipt_id,
            is_deleted,
            investment_profile_id,
            isSubmitted
        } = req.body;

        // Create Investment Profile
        const currentDate = new Date();
        const investmentDate = new Date(currentDate);
        if (duration === "12") {
            investmentDate.setFullYear(currentDate.getFullYear() + 1);
        } else {
            investmentDate.setMonth(currentDate.getMonth() + Number(duration));
            if (investmentDate.getDate() < currentDate.getDate()) {
                investmentDate.setDate(0); // Set to the last day of the previous month
            }
        }
        const formattedDate = investmentDate.toISOString().split('T')[0];

        investmentProfile = new InvestmentProfile({
            user_id,
            project_id,
            invested_amount,
            profit_earned,
            loss,
            investment_frequency,
            next_investment: formattedDate,
            is_active,
        });
        await investmentProfile.save();

        // Create Investment
        const currentDateforInvestment = new Date();
        const investmentDateforInvestment = new Date(currentDateforInvestment);
        const formattedDateforInvestment = investmentDateforInvestment.toISOString().split("T")[0];

        if (isSubmitted) {
            investmentEntry = new Investments({
                investment_profile_id: investmentProfile._id,
                Investments: {
                    investment_amount: invested_amount,
                    investment_date: formattedDateforInvestment,
                    investment_status: "unpaid",
                    is_active,
                },
            });
            await investmentEntry.save();
        }

        // Create Receipt
        if (receipt_path && receipt_id) {
            newReceipt = await InvestmentReceipt.create({
                receipt_path,
                user_id,
                investment_id: investmentEntry._id,
                investment_profile_id: investmentProfile._id,
                receipt_id,
                is_deleted,
            });
            return res.status(201).json({ message: 'Combined data processed successfully', data: { investmentProfile, investmentEntry, newReceipt } });
        }

        res.status(400).json({ error: 'Invalid request. All required fields must be provided.' });
    } catch (error) {
        // Rollback the created entries if any
        if (newReceipt) {
            await newReceipt.remove();
        }
        if (investmentEntry) {
            await investmentEntry.remove();
        }
        if (investmentProfile) {
            await investmentProfile.remove();
        }
        console.log(error.message);
        res.status(500).json({ error: 'An error occurred while processing the combined data' });
    }
};


exports.getInvestmentProfiles = async (req, res,next) => {
    try {
        // Extract user_id from the request body
        const { user_id } = req.body;

        // Retrieve investment profiles from the database for the given user_id
        const investmentProfiles = await InvestmentProfile.find({ user_id }).populate('project_id');

        // Check if any investment profiles are found
        if (investmentProfiles.length === 0) {
            return res.status(200).json({ message: 'No investment profiles found for the user' });
        }

        // Modify the response to include the project name
        const response = investmentProfiles.map(profile => {
            return {
                ...profile._doc,
                project_name: profile.project_id.name // Assuming the project has a 'name' field
            }
        });

        // Return the investment profiles as a response
        res.status(200).json({ message: 'Investment profiles retrieved successfully', data: response });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: 'An error occurred while retrieving the investment profiles' });
    }
};

// Controller function for updating the is_active field in an investment profile

exports.updateInvestmentProfileIsActive = async (req, res,next) => {
    try {
        const { id } = req.body;

        // Find the investment profile by ID
        const investmentProfile = await InvestmentProfile.findByIdAndUpdate(id, { is_active:true }, { new: true });

        if (!investmentProfile) {
            return res.status(200).json({ error: 'Investment profile not found' });
        }

        res.status(200).json(investmentProfile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update investment profile' });
    }
};

// Controller function for updating the invested_amount and investment_frequency fields in an investment profile
exports.updateInvestmentProfileById = async (req, res, next) => {
    try {
        const { id, invested_amount, investment_frequency } = req.body;

        // Find the investment profile by ID
        const investmentProfile = await InvestmentProfile.findByIdAndUpdate(id, { invested_amount, investment_frequency }, { new: true });

        if (!investmentProfile) {
            return res.status(200).json({ error: 'Investment profile not found' });
        }

        res.status(200).json(investmentProfile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update investment profile' });
    }
};

// Controller function for deleting a project
exports.deleteProject = async (req, res, next) => {
    try {
        const project_id = req.params.id;

        // Check if the project exists in any investment profile
        const investmentProfile = await InvestmentProfile.findOne({ project_id });

        if (investmentProfile) {
            return res.status(400).json({ error: 'Cannot delete the project as it is associated with an investment profile' });
        }

        // Delete the project
        await Project.findByIdAndDelete(project_id);

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the project' });
    }
};


exports.getInvestmentProfilesByUserAndProject = async (req, res, next) => {
    try {
        const { user_id, project_id } = req.body;

        // Retrieve investment profiles from the database for the given user_id and project_id
        const investmentProfiles = await InvestmentProfile.find({ user_id, project_id });

        // Check if any investment profiles are found
        if (investmentProfiles.length === 0) {
            return res.status(200).json({ message: 'No investment profiles found for the user and project' });
        }

        // Filter out inactive investment profiles
        const activeInvestmentProfiles = investmentProfiles.filter(profile => profile.is_active);

        // Check if any active investment profiles are found
        if (activeInvestmentProfiles.length === 0) {
            return res.status(200).json({ message: 'No active investment profiles found for the user and project' });
        }

        // Store the investment profiles in an array
        const investmentProfilesArray = activeInvestmentProfiles.map(profile => profile._id);

        // Return the investment profiles as a response
        res.status(200).json({ message: 'Active investment profiles retrieved successfully', data: investmentProfilesArray, investmentProfiles: activeInvestmentProfiles });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: 'An error occurred while retrieving the investment profiles' });
    }
};




exports.calculateProfitPercentage = async (req, res, next) => {
    try {
        const { userId, projectId, profitAmount, totalInvestedAmount } = req.body;
   const investmentProfiles = await InvestmentProfile.find({ user_id: userId, project_id: projectId });

        if (investmentProfiles.length === 0) {
            return res.status(400).json({ error: 'No investment profiles found for the user and project' });
        }

        // Calculate the total invested amount from all investment profiles
        const investedAmount = investmentProfiles.reduce((total, profile) => total + profile.invested_amount, 0);
        // Calculate the profit percentage
        const profitPercentage = (profitAmount / totalInvestedAmount) * investedAmount;

        res.status(200).json({ profit_percentage: profitPercentage });
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate profit percentage' });
    }
};
exports.fetchProfitLossByDate = async (req, res, next) => {
    const { entryid } = req.body;

    if (!entryid) {
        return res.status(400).json({ error: 'Entry ID is required' });
    }

    try {
       
        const profitLossRecords = await ProfitLoss.find({
            profit_loss_entry_id: entryid  
        })
        .populate('project_id', 'project_name')  
        .populate('user_id', 'fullName email'); 

        console.log('Profit/Loss Records:', profitLossRecords);

        if (profitLossRecords.length === 0) {
            console.log("No records found for the specified entry ID");
            return res.status(200).json({ message: 'No records found for the specified entry ID' });
        }

        // Prepare the response with the relevant data
        const response = profitLossRecords.map(record => {
            return {
                userId: record.user_id._id,
                name: record.user_id.fullName,
                profit: record.profit_amount,
                invested_amount:record.invested_amount,
                loss: record.loss_amount,
                netProfit: record.net_profit,
                projectName: record.project_id ? record.project_id.project_name : 'N/A' // Project name from the populated field
            };
        });

        console.log('Formatted response:', response);
        res.status(200).json({
            message: 'Profit/Loss records fetched successfully',
            records: response,
        });
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ error: 'Failed to fetch Profit/Loss records' });
    }
};




exports.calculateProfitPercentageForAllUsers = async (req, res, next) => {
    console.log("Request body:", req.body);
    const { projectId, profitAmount, totalInvestedAmount, profit_loss_entry_id } = req.body;

    if (!projectId || typeof profitAmount !== 'number' || typeof totalInvestedAmount !== 'number') {
        console.log("Invalid input data");
        return res.status(400).json({ error: 'Invalid input data' });
    }

    try {
        // Fetch active investment profiles for the project
        const investmentProfiles = await InvestmentProfile.find({
            project_id: projectId,
            is_active: true
        }).populate('user_id', 'fullName email');

        console.log("Investment profiles found:", investmentProfiles.length);

        if (investmentProfiles.length === 0) {
            console.log("No investment profiles found for the project");
            return res.status(200).json({ message: 'No investment profiles found for the project' });
        }

        // Group data by user
        const userMap = {};

        for (const profile of investmentProfiles) {
            if (profile.user_id && profile.user_id._id) {
                const userId = profile.user_id._id.toString();

                if (!userMap[userId]) {
                    userMap[userId] = {
                        userId,
                        name: profile.user_id.fullName,
                        email: profile.user_id.email,
                        invested_amount: 0, // Sum of all investments for the user
                        total_profits: 0,  // Total profits from ProfitLoss
                        total_losses: 0,   // Total losses from ProfitLoss
                    };
                }

                // Add the investment amount for the user
                userMap[userId].invested_amount += profile.invested_amount;
            } else {
                console.warn("Profile with missing user_id:", profile);
            }
        }

        // Fetch profit/loss data for all users in the project
        const userIds = Object.keys(userMap);
        const profitLossRecords = await ProfitLoss.find({
            user_id: { $in: userIds },
            project_id: projectId,
        });

        // Aggregate profits and losses by user
        profitLossRecords.forEach(record => {
            const userId = record.user_id.toString();
            if (userMap[userId]) {
                userMap[userId].total_profits += record.profit_amount;
                userMap[userId].total_losses += record.loss_amount;
            }
        });

        // Prepare final response
        const response = [];
        for (const userId in userMap) {
            const userData = userMap[userId];
            const updatedInvestment = userData.invested_amount + userData.total_profits - userData.total_losses;

            // Calculate the user's share of profit/loss
            let amount = (Math.abs(profitAmount) / totalInvestedAmount) * updatedInvestment;
            const isProfit = profitAmount >= 0;

            // Round the amounts to the nearest integer
            amount = Math.round(amount); // Round to nearest integer

            const profitAmountRounded = isProfit ? Number(amount.toFixed(1)) : 0; // Round profit to 1 decimal place
            const lossAmountRounded = isProfit ? 0 : Number(amount.toFixed(1));
             const netProfitRounded = isProfit ? profitAmountRounded : -lossAmountRounded;

            // Add final calculated data to response
            response.push({
                userId: userData.userId,
                name: userData.name,
                email: userData.email,
                invested_amount: Number(updatedInvestment.toFixed(1)),
                profit_amount: profitAmountRounded, 
                loss_amount: lossAmountRounded,    
                net_profit: netProfitRounded,       
            });

            // Optionally, save the calculated profit/loss in the database
            await ProfitLoss.create({
                user_id: userData.userId,
                project_id: projectId,
                profit_loss_entry_id: profit_loss_entry_id,
                invested_amount: Number(updatedInvestment.toFixed(1)),// Store the profit_loss_entry_id
                profit_amount: profitAmountRounded,
                loss_amount: lossAmountRounded,
                net_profit: netProfitRounded,
            });
        }

        console.log("Profit/Loss calculations completed:", response.length);

        res.status(200).json({
            message: 'Profit and loss calculated and stored successfully',
            userDetails: response,
        });
    } catch (error) {
        console.error('Failed to calculate profit/loss:', error);
        res.status(500).json({ error: 'Failed to calculate profit/loss' });
    }
};
// exports.calculateUserCapital = async (req, res, next) => {
//     console.log("Request received:", req.body);
//     const { projectId } = req.body;

//     if (!projectId) {
//         console.log("Invalid input data: projectId is required");
//         return res.status(400).json({ error: 'Invalid input data: projectId is required' });
//     }

//     try {
//         // Fetch all active investment profiles for the given project
//         const investmentProfiles = await InvestmentProfile.find({
//             project_id: projectId,
//             is_active: true
//         }).populate('user_id', 'fullName email');

//         console.log("Investment profiles found:", investmentProfiles.length);

//         if (investmentProfiles.length === 0) {
//             console.log("No investment profiles found for the project");
//             return res.status(200).json({ message: 'No investment profiles found for the project' });
//         }

//         // Group investments by user
//         const userMap = {};
//         for (const profile of investmentProfiles) {
//             if (profile.user_id && profile.user_id._id) {
//                 const userId = profile.user_id._id.toString();

//                 if (!userMap[userId]) {
//                     userMap[userId] = {
//                         userId,
//                         name: profile.user_id.fullName,
//                         email: profile.user_id.email,
//                         invested_amount: 0,
//                         total_profits: 0,
//                         total_losses: 0,
//                     };
//                 }

//                 // Accumulate invested amounts
//                 userMap[userId].invested_amount += profile.invested_amount;
//             } else {
//                 console.warn("Profile with missing user_id:", profile);
//             }
//         }

//         // Fetch profit/loss records for users in the project
//         const userIds = Object.keys(userMap);
//         const profitLossRecords = await ProfitLoss.find({
//             user_id: { $in: userIds },
//             project_id: projectId,
//         });

//         // Aggregate profits and losses by user
//         profitLossRecords.forEach(record => {
//             const userId = record.user_id.toString();
//             if (userMap[userId]) {
//                 userMap[userId].total_profits += record.profit_amount;
//                 userMap[userId].total_losses += record.loss_amount;
//             }
//         });

//         // Calculate total capital for each user
//         const response = [];
//         for (const userId in userMap) {
//             const userData = userMap[userId];
//             const capitalAmount = userData.invested_amount + userData.total_profits - userData.total_losses;

//             response.push({
//                 userId: userData.userId,
//                 name: userData.name,
//                 email: userData.email,
//                 invested_amount: parseFloat(userData.invested_amount.toFixed(1)), // Ensure number format
//     profit_amount: parseFloat(userData.total_profits.toFixed(1)),
//     loss_amount: parseFloat(userData.total_losses.toFixed(1)),
//     capital_amount: parseFloat(capitalAmount.toFixed(1)),
//             });
//         }

//         console.log("Capital calculation completed for users:", response.length);

//         // Return calculated data
//         res.status(200).json({
//             message: 'Capital calculated successfully',
//             userDetails: response,
//         });
//     } catch (error) {
//         console.error('Error calculating user capital:', error);
//         res.status(500).json({ error: 'Failed to calculate user capital' });
//     }
// };
exports.calculateUserCapital = async (req, res, next) => {
    console.log("Request received:", req.body);
    const { projectId } = req.body;

    if (!projectId) {
        console.log("Invalid input data: projectId is required");
        return res.status(400).json({ error: 'Invalid input data: projectId is required' });
    }

    try {
        // Fetch all active investment profiles for the given project
        const investmentProfiles = await InvestmentProfile.find({
            project_id: projectId,
            is_active: true
        }).populate('user_id', 'fullName email');

        console.log("Investment profiles found:", investmentProfiles.length);

        if (investmentProfiles.length === 0) {
            console.log("No investment profiles found for the project");
            return res.status(200).json({ message: 'No investment profiles found for the project' });
        }

        // Group investments by user
        const userMap = {};
        for (const profile of investmentProfiles) {
            if (profile.user_id && profile.user_id._id) {
                const userId = profile.user_id._id.toString();

                if (!userMap[userId]) {
                    userMap[userId] = {
                        userId,
                        name: profile.user_id.fullName,
                        email: profile.user_id.email,
                        invested_amount: 0,
                        total_profits: 0,
                        total_losses: 0,
                    };
                }

                // Accumulate invested amounts
                userMap[userId].invested_amount += profile.invested_amount;
            } else {
                console.warn("Profile with missing user_id:", profile);
            }
        }

        // Fetch profit/loss records for users in the project
        const userIds = Object.keys(userMap);
        const profitLossRecords = await ProfitLoss.find({
            user_id: { $in: userIds },
            project_id: projectId,
        });

        // Aggregate profits and losses by user
        profitLossRecords.forEach(record => {
            const userId = record.user_id.toString();
            if (userMap[userId]) {
                userMap[userId].total_profits += record.profit_amount;
                userMap[userId].total_losses += record.loss_amount;
            }
        });

        // Calculate total capital for each user and the project's total capital
        const response = [];
        let totalProjectCapital = 0; // Variable to store the project's total capital

        for (const userId in userMap) {
            const userData = userMap[userId];
            const capitalAmount = userData.invested_amount + userData.total_profits - userData.total_losses;

            // Accumulate total capital
            totalProjectCapital += capitalAmount;

            response.push({
                userId: userData.userId,
                name: userData.name,
                email: userData.email,
                invested_amount: parseFloat(userData.invested_amount.toFixed(1)), // Ensure number format
                profit_amount: parseFloat(userData.total_profits.toFixed(1)),
                loss_amount: parseFloat(userData.total_losses.toFixed(1)),
                capital_amount: parseFloat(capitalAmount.toFixed(1)),
            });
        }

        console.log("Capital calculation completed for users:", response.length);
        console.log("Total project capital:", totalProjectCapital);

        // Return calculated data, including the project's total capital
        res.status(200).json({
            message: 'Capital calculated successfully',
            userDetails: response,
            totalProjectCapital: parseFloat(totalProjectCapital.toFixed(1)), // Ensure proper format
        });
    } catch (error) {
        console.error('Error calculating user capital:', error);
        res.status(500).json({ error: 'Failed to calculate user capital' });
    }
};

exports.calculateUserCapitalById = async (req, res, next) => {
    console.log("Request received:", req.body);
    const { userId } = req.body;

    if (!userId) {
        console.log("Invalid input data: userId is required");
        return res.status(400).json({ error: 'Invalid input data: userId is required' });
    }

    try {
        // Fetch all investment profiles for the user
        const investmentProfiles = await InvestmentProfile.find({
            user_id: userId,
            is_active: true,
        });

        console.log("Investment profiles found for user:", investmentProfiles.length);

        if (investmentProfiles.length === 0) {
            console.log("No investment profiles found for the user");
            return res.status(200).json({
                message: 'No investment profiles found for the user',
                userDetails: {
                    invested_amount: 0,
                    total_profits: 0,
                    total_losses: 0,
                    capital_amount: 0,
                },
            });
        }

        // Calculate total invested amount
        let totalInvestedAmount = 0;
        investmentProfiles.forEach(profile => {
            totalInvestedAmount += profile.invested_amount;
        });

        // Fetch profit/loss records for the user
        const profitLossRecords = await ProfitLoss.find({
            user_id: userId,
        });

        console.log("Profit/Loss records found for user:", profitLossRecords.length);

        // Calculate total profits and losses
        let totalProfits = 0;
        let totalLosses = 0;
        profitLossRecords.forEach(record => {
            totalProfits += record.profit_amount;
            totalLosses += record.loss_amount;
        });

        // Calculate user's capital
        const capitalAmount = totalInvestedAmount + totalProfits - totalLosses;

        const response = {
            userId,
            invested_amount: parseFloat(totalInvestedAmount.toFixed(1)), // Ensure number format
            profit_amount: parseFloat(totalProfits.toFixed(1)),
            loss_amount: parseFloat(totalLosses.toFixed(1)),
            capital_amount: parseFloat(capitalAmount.toFixed(1)),
        };

        console.log("Capital calculation completed for user:", response);

        // Return calculated data
        res.status(200).json({
            message: 'Capital calculated successfully',
            userDetails: response,
        });
    } catch (error) {
        console.error('Error calculating user capital:', error);
        res.status(500).json({ error: 'Failed to calculate user capital' });
    }
};




// Controller function for calculating profit percentage for all users
// exports.calculateProfitPercentageForAllUsers = async (req, res, next) => {
//     const { projectId, profitAmount, totalInvestedAmount } = req.body;

//     try {
//         // Find all active investment profiles for the given project
//         const investmentProfiles = await InvestmentProfile.find({ project_id: projectId, is_active: true });

//         if (investmentProfiles.length === 0) {
//             return res.status(400).json({ error: 'No active investment profiles found for the project' });
//         }

//         // Calculate the total profit and loss for the project
//         const totalProfit = profitAmount >= 0 ? profitAmount : 0;
//         const totalLoss = profitAmount < 0 ? -profitAmount : 0;

//         // Create a profit/loss entry for each user of the project
//         const promises = investmentProfiles.map(async (profile) => {
//             const { user_id, invested_amount } = profile;
//             const profit = (profitAmount / totalInvestedAmount) * invested_amount;
//             const loss = profitAmount < 0 ? -profit : 0;

//             try {
//                 // Check if there's an existing entry for the user and project
//                 const existingEntry = await ProfitLoss.findOne({ user_id });

//                 if (existingEntry) {
//                     // If an entry exists, update profit and loss amounts
//                     existingEntry.profit_amount += profit;
//                     existingEntry.loss_amount += loss;
//                     await existingEntry.save();
//                 } else {
//                     // If no entry exists, create a new one
//                     const newEntry = new ProfitLoss({
//                         user_id,
//                         profit_amount: profit,
//                         loss_amount: loss,
//                         is_profit_calculated: true // Set initially to true
//                     });
//                     await newEntry.save();
//                 }
//             } catch (error) {
//                 console.error('Failed to update profit/loss entry:', error);
//             }
//         });

//         await Promise.all(promises);

//         res.status(200).json({ message: 'Profit and loss calculated and stored successfully' });
//     } catch (error) {
//         console.error('Failed to calculate profit/loss:', error);
//         res.status(500).json({ error: 'Failed to calculate profit/loss' });
//     }
// };



exports.checkInvestmentTime = async (req, res, next) => {
    try {
        const { user_id } = req.body;

        // Find all unique project IDs for the given user_id
        const uniqueProjectIds = await InvestmentProfile.distinct('project_id', { user_id });

        if (uniqueProjectIds.length === 0) {
            return res.status(400).json({ error: 'No active investment profiles found for the user' });
        }

        // Create an array to store project names for which it's time for a new investment
        const projectsForNewInvestment = [];

        // Iterate over each unique project ID
        for (const projectId of uniqueProjectIds) {
            // Find all active investment profiles for the current project_id
            const investmentProfiles = await InvestmentProfile.find({ user_id, project_id: projectId, is_active: true })
                .sort({ next_investment: -1 });

            // Check if any investment profile exists for the project
            if (investmentProfiles.length > 0) {
                // Get the first investment profile for the current project_id
                const firstProfile = investmentProfiles[0];

                // Get the end date of the first profile
                const endDate = new Date(firstProfile.next_investment);

                // Check if it's time for the next investment
                if (Date.now() >= endDate.getTime()) {
                    // Fetch the project name associated with the project ID
                    const project = await Project.findById(projectId);
                    if (project) {
                        // Add the project name to the array
                        projectsForNewInvestment.push(project.project_name);
                    }
                }
            }
        }

        // Send a response with the projects for which it's time for a new investment
        if (projectsForNewInvestment.length > 0) {
            return res.status(200).json({ message: 'Investment time checked successfully', projectsForNewInvestment });
        } else {
            return res.status(200).json({ message: 'No projects require new investment at this time' });
        }
    } catch (error) {
        console.error('Failed to check investment time:', error);
        res.status(500).json({ error: 'Failed to check investment time' });
    }
};




// exports.deleteInvestmentProfile = async (req, res, next) => {
//     try {
//         const { user_id, project_id, with_draw } = req.body;

//         // Check if with_draw is true
//         if (with_draw === true) {
//             // Retrieve the investment profiles to be deleted
//             const investmentProfiles = await InvestmentProfile.find({ user_id, project_id });

//             if (investmentProfiles.length > 0) {
//                 await Investments.deleteMany({ investment_profile_id: { $in: investmentProfiles.map(profile => profile._id) } });
//                 await InvestmentReceipt.deleteMany({ investment_profile_id: { $in: investmentProfiles.map(profile => profile._id) } });
//                 await WithdrawRequest.deleteMany({ investment_profile_id: { $in: investmentProfiles.map(profile => profile._id) } });
//             }

//             // Delete the investment profiles
//             await InvestmentProfile.deleteMany({ user_id, project_id });

//             res.status(200).json({ message: 'Investment profiles and associated records deleted successfully' });
//         } else {
//             res.status(400).json({ error: 'Invalid request. with_draw must be true' });
//         }
//     } catch (error) {
//         console.error('Failed to delete investment profiles:', error);
//         res.status(500).json({ error: 'Failed to delete investment profiles' });
//     }
// };

exports.deleteInvestmentProfile = async (req, res, next) => {
    try {
        const { user_id, project_id, with_draw } = req.body;

        // Check if with_draw is true
        if (with_draw === true) {
            // Retrieve the investment profiles to be deleted
            const investmentProfiles = await InvestmentProfile.find({ user_id, project_id });

            if (investmentProfiles.length > 0) {
                // Calculate total invested amount
                const totalInvestedAmount = investmentProfiles.reduce((total, profile) => total + profile.invested_amount, 0);

                // Subtract total invested amount from project's invested_amount
                const project = await Project.findById(project_id);
                project.invested_amount -= totalInvestedAmount;
                await project.save();

                // Delete associated records
                await Investments.deleteMany({ investment_profile_id: { $in: investmentProfiles.map(profile => profile._id) } });
                await InvestmentReceipt.deleteMany({ investment_profile_id: { $in: investmentProfiles.map(profile => profile._id) } });
                await WithdrawRequest.deleteMany({ investment_profile_id: { $in: investmentProfiles.map(profile => profile._id) } });
            }

            // Delete the investment profiles
            await InvestmentProfile.deleteMany({ user_id, project_id });

            res.status(200).json({ message: 'Investment profiles and associated records deleted successfully' });
        } else {
            res.status(400).json({ error: 'Invalid request. with_draw must be true' });
        }
    } catch (error) {
        console.error('Failed to delete investment profiles:', error);
        res.status(500).json({ error: 'Failed to delete investment profiles' });
    }
};




exports.getInvestmentProfilesWithProjectNames = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user_id = id;
        console.log(user_id);

        // Retrieve investment profiles from the database for the given user_id
        const investmentProfiles = await InvestmentProfile.find({ user_id, is_active: true }).populate('project_id');
        console.log(investmentProfiles);

        // // Check if any investment profiles are found
        // if (investmentProfiles.length === 0) {
        //     return res.status(400).json({ error: 'No investment profiles found for the user' });
        // }

        // Extract unique project names and project IDs from investment profiles
        const uniqueProjects = {};
        investmentProfiles.forEach(profile => {
            const projectId = profile.project_id._id.toString();
            const projectName = profile.project_id.project_name;
            if (!uniqueProjects[projectId]) {
                uniqueProjects[projectId] = projectName;
            }
        });

        // Convert object to array of objects
        const projectDetails = Object.keys(uniqueProjects).map(projectId => ({
            project_id: projectId,
            project_name: uniqueProjects[projectId]
        }));

        res.status(200).json(projectDetails);
    } catch (error) {
        console.error('Failed to retrieve investment profiles:', error);
        res.status(500).json({ error: 'Failed to retrieve investment profiles' });
    }
};
exports.getInvestmentProfilesForProject = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        console.log(projectId);
        const investmentProfiles = await InvestmentProfile.find({ project_id: projectId, is_active: true }).populate('user_id');
        console.log(investmentProfiles);
        if (investmentProfiles.length === 0) {
            return res.status(400).json({ error: 'No investment profiles found for this project' });
        }
        const userProfiles = investmentProfiles.map(profile => ({
            user_id: profile.user_id._id,
            user_name: profile.user_id.fullName,
            invested_amount: profile.invested_amount,
            // investment_date: profile.createdAt
        }));

        res.status(200).json(userProfiles);
    } catch (error) {
        console.error('Failed to retrieve investment profiles:', error);
        res.status(500).json({ error: 'Failed to retrieve investment profiles' });
    }
};



// Controller function for getting investment profiles with withdraw flag set to true
exports.getWithdrawnInvestmentProfiles = async (req, res, next) => {
    try {
        // Find all investment profiles where with_draw is true
        const investmentProfiles = await InvestmentProfile.find({ with_draw: true })
        .populate('user_id')
        res.status(200).json(investmentProfiles);
    } catch (error) {
        console.error('Failed to retrieve withdrawn investment profiles:', error);
        res.status(500).json({ error: 'Failed to retrieve withdrawn investment profiles' });
    }
};


exports.getWithdrawnInvestmentProfilesByUserAndProject = async (req, res, next) => {
    try {
        const { user_id, project_id } = req.body;

        // Find all investment profiles where with_draw is true and user_id and project_id match
        const investmentProfiles = await InvestmentProfile.find({ with_draw: true, user_id, project_id })
            .populate('user_id');

        res.status(200).json(investmentProfiles);
    } catch (error) {
        console.error('Failed to retrieve withdrawn investment profiles:', error);
        res.status(500).json({ error: 'Failed to retrieve withdrawn investment profiles' });
    }
};



// Controller function for getting an investment profile by id
exports.getWithDrawInvestmentProfileById = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Find the investment profile by id
        const investmentProfile = await InvestmentProfile.findById(id)
        .populate("project_id")
        .populate("user_id")
        // Check if the investment profile exists
        if (!investmentProfile) {
            return res.status(404).json({ error: 'Investment profile not found' });
        }

        res.status(200).json(investmentProfile);
    } catch (error) {
        console.log('Failed to retrieve investment profile:', error.message);
        res.status(500).json({ error: 'Failed to retrieve investment profile' });
    }
};




// // Controller function for setting the withdraw flag to true for all investment profiles of a user and project
// exports.setWithdrawFlagForInvestmentProfiles = async (req, res, next) => {
//     try {
//         const { user_id, project_id,withdraw_type,withdraw_amount } = req.body;
//         console.log(req.body)
//         // Find all investment profiles for the given user_id and project_id

//             const investmentProfiles = await InvestmentProfile.find({ user_id, project_id });


//         // Check if any investment profiles are found
//         if (investmentProfiles.length === 0) {
//             return res.status(400).json({ error: 'No investment profiles found for the user and project' });
//         }

//         // Check if a withdrawal request already exists for the given user_id and project_id
//         const existingWithdrawRequest = await WithdrawRequest.findOne({ user_id, project_id });

//         // If a withdrawal request already exists, return an error
//         if (existingWithdrawRequest) {
//             return res.status(400).json({ error: 'Withdrawal request already exists for the user and project' });
//         }

//         // Set the withdraw flag to true for all investment profiles
//         await InvestmentProfile.updateMany({ user_id, project_id }, { $set: { with_draw: true } });

//         // Create entries in the WithdrawRequest model for each investment profile
//         const withdrawRequests = await WithdrawRequest.create({
//             user_id,
//             project_id,
//             investment_profile_ids: investmentProfiles.map(profile => profile._id),
//             withdraw_type,
//             withdraw_amount
//         });

//         res.status(200).json({ message: 'Withdraw flag set to true for all investment profiles' });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ error: 'Failed to set withdraw flag' });
//     }
// };



// Controller function for setting the withdraw flag to true for all investment profiles of a user and project
exports.setWithdrawFlagForInvestmentProfiles = async (req, res, next) => {
    try {
        const { user_id, project_id, withdraw_type, withdraw_amount,account_number,accountName } = req.body;
        const amount = parseFloat(withdraw_amount);
        console.log(req.body);
        if (withdraw_type === "project") {
        // Find all investment profiles for the given user_id and project_id
        const investmentProfiles = await InvestmentProfile.find({ user_id, project_id });

        // Check if any investment profiles are found
        if (investmentProfiles.length === 0) {
            return res.status(400).json({ error: 'No investment profiles found for the user and project' });
        }

        // Check if a withdrawal request already exists for the given user_id and project_id
        const existingWithdrawRequest = await WithdrawRequest.findOne({ user_id, project_id });

        // If a withdrawal request already exists, return an error
        if (existingWithdrawRequest) {
            return res.status(400).json({ error: 'Withdrawal request already exists for the user and project' });
        }


            // Set the withdraw flag to true for all investment profiles
            await InvestmentProfile.updateMany({ user_id, project_id }, { $set: { with_draw: true } });

            // Create entries in the WithdrawRequest model for each investment profile
            const withdrawRequests = await WithdrawRequest.create({
                user_id,
                project_id,
                investment_profile_ids: investmentProfiles.map(profile => profile._id),
                withdraw_type,
                account_number,
                accountName
            });

            return res.status(200).json({ message: 'Withdraw flag set to true for all investment profiles',data:withdrawRequests });
        } else if (withdraw_type === "profit") {

            // Check if a withdrawal request already exists for the given user_id
            let existingWithdrawRequest = await WithdrawRequest.findOne({ user_id ,withdraw_type : "profit" });

            if (existingWithdrawRequest) {
                // If a withdrawal request already exists, update the existing entry
                existingWithdrawRequest.withdraw_amount += amount;
                await existingWithdrawRequest.save();
            } else {
                // If no withdrawal request exists, create a new entry
                existingWithdrawRequest = await WithdrawRequest.create({
                    user_id,
                    withdraw_type,
                    withdraw_amount,
                    account_number,
                    accountName
                });
            }

            return res.status(200).json({ message: 'Withdrawal amount added to user\'s account',data:withdrawRequests });
        }else {
            return res.status(400).json({ error: 'Invalid withdraw type' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Failed to process withdraw request' });
    }
};
