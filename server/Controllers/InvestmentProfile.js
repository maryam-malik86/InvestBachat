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



// Controller function for calculating profit percentage
exports.calculateProfitPercentage = async (req, res, next) => {
    try {
        const { userId, projectId, profitAmount, totalInvestedAmount } = req.body;

        // Find the investment profiles for the given user_id and project_id
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





exports.calculateProfitPercentageForAllUsers = async (req, res, next) => {
    console.log("Request body:", req.body);
    const { projectId, profitAmount, totalInvestedAmount } = req.body;

    if (!projectId || typeof profitAmount !== 'number' || typeof totalInvestedAmount !== 'number') {
        console.log("Invalid input data");
        return res.status(400).json({ error: 'Invalid input data' });
    }

    try {
        const investmentProfiles = await InvestmentProfile.find({ project_id: projectId, is_active: true }).populate('user_id', 'fullName email');
        console.log("Investment profiles found:", investmentProfiles.length);

        if (investmentProfiles.length === 0) {
            console.log("No investment profiles found for the project");
            return res.status(200).json({ error: 'No investment profiles found for the project' });
        }

        const profitLossMap = {};
        investmentProfiles.forEach(profile => {
            if (profile.user_id && profile.user_id._id) {
                const userId = profile.user_id._id.toString();
                let amount = (Math.abs(profitAmount) / totalInvestedAmount) * profile.invested_amount;
                amount = Number(amount.toFixed(2));
                const isProfit = profitAmount >= 0;
        
                if (userId in profitLossMap) {
                    profitLossMap[userId][isProfit ? 'profit_amount' : 'loss_amount'] += amount;
                    profitLossMap[userId].invested_amount += profile.invested_amount;
                } else {
                    profitLossMap[userId] = {
                        user_id: userId,
                        name: profile.user_id.fullName,
                        email: profile.user_id.email,
                        project_id: projectId,
                        invested_amount: profile.invested_amount,
                        profit_amount: isProfit ? amount : 0,
                        loss_amount: isProfit ? 0 : amount,
                    };
                }
            } else {
                console.warn("Profile with missing user_id:", profile);
            }
        });
        

        console.log("Profit/Loss map created:", Object.keys(profitLossMap).length);

        const promises = Object.values(profitLossMap).map(async (entry) => {
            const { user_id, project_id, profit_amount, loss_amount } = entry;

            try {
                const existingEntry = await ProfitLoss.findOne({ user_id, project_id });

                if (existingEntry) {
                    existingEntry.profit_amount += profit_amount;
                    existingEntry.loss_amount += loss_amount;
                    existingEntry.net_profit = existingEntry.profit_amount - existingEntry.loss_amount;
                    await existingEntry.save();
                    entry.net_profit = existingEntry.net_profit;
                } else {
                    const newEntry = new ProfitLoss({
                        user_id,
                        project_id,
                        profit_amount,
                        loss_amount,
                        net_profit: profit_amount - loss_amount,
                        is_profit_calculated: true,
                    });
                    await newEntry.save();
                    entry.net_profit = newEntry.net_profit;
                }
            } catch (error) {
                console.error('Failed to update profit/loss entry:', error);
            }
        });

        await Promise.all(promises);

        const userDetails = Object.values(profitLossMap);
        console.log("User details to be sent:", userDetails);

        res.status(200).json({ 
            message: 'Profit and loss calculated and stored successfully',
            userDetails: userDetails
        });
    } catch (error) {
        console.error('Failed to calculate profit/loss:', error);
        res.status(500).json({ error: 'Failed to calculate profit/loss' });
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
