const Investments = require("../models/InvestmentModel");

exports.createInvestment = async (req, res,next) => {
  try {
    // Get the investment profile ID, duration, amount, and isSubmitted from req.body
    const { investment_profile_id, duration, amount, is_active, isSubmitted } =
      req.body;

    // Get the current date
    const currentDate = new Date();

    // Calculate the investment date based on the duration
    const investmentDate = new Date(currentDate);
    
    // Format the date to display only the date part
    const formattedDate = investmentDate.toISOString().split("T")[0];

    // If isSubmitted is true, create the Investment entry
    if (isSubmitted) {
      const investmentEntry = new Investments({
        investment_profile_id,
        Investments: {
          investment_amount: Number(amount),
          investment_date: formattedDate, // Use the formatted date
          investment_status: "unpaid",
          is_active,
        },
      });

      // Save the Investment entry to the database
      await investmentEntry.save();

      // Return success response with created investment data
      return res
        .status(200)
        .json({
          message: "Investment created successfully",
          investment: investmentEntry,
        });
    }

    // If isSubmitted is false, return success response without creating entry
    return res
      .status(200)
      .json({ message: "Investment not created as isSubmitted is false" });
  } catch (error) {
    // Handle any errors
    console.log(error.message)
    return res.status(500).json({ message: "Internal server error" });
  }
};



exports.updateInvestment = async (req, res,next) => {
  try {
    // Get the investment ID and is_active from req.body
    const { id, is_active } = req.body;

    // Find the Investment entry by ID
    const investment = await Investments.findById(id);

    // If the Investment entry is not found, return error response
    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    // Update the is_active field of the Investment entry
    investment.Investments.is_active = is_active;

    // Save the updated Investment entry to the database
    await investment.save();

    // Return success response with updated investment data
    return res.status(200).json({
      message: "Investment updated successfully",
      investment: investment,
    });
  } catch (error) {
    // Handle any errors

    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.updateInvestmentById = async (req, res, next) => {
  try {
    // Get the investment ID and investment_amount from req.body
    const { id, investment_amount } = req.body;
    // Find the Investment entry by ID
    const investment = await Investments.findById(id);

    // If the Investment entry is not found, return error response
    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    // Update the investment_amount field of the Investment entry
    investment.Investments.investment_amount = Number(investment_amount);

    // Save the updated Investment entry to the database
    await investment.save();

    // Return success response with updated investment data
    return res.status(200).json({
      message: "Investment updated successfully",
      investment: investment,
    });
  } catch (error) {
    // Handle any errors

    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateInvestmentStatusById = async (req, res, next) => {
  try {
    // Get the investment ID and investment_status from req.body
    const { id, investment_status } = req.body;
    // Find the Investment entry by ID
    const investment = await Investments.findById(id);

    // If the Investment entry is not found, return error response
    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    // Update the investment_status field of the Investment entry
    investment.Investments.investment_status = investment_status;

    // Save the updated Investment entry to the database
    await investment.save();

    // Return success response with updated investment data
    return res.status(200).json({
      message: "Investment status updated successfully",
      investment: investment,
    });
  } catch (error) {
    // Handle any errors

    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getInvestmentsByProfileIds = async (req, res, next) => {
  try {
    // Get the investment profile IDs from req.body
    const { investmentProfileIds } = req.body;

    // Find all Investments entries with matching investment_profile_id
    const investments = await Investments.find({
      investment_profile_id: { $in: investmentProfileIds },
    });

    // Return success response with the investments data
    return res.status(200).json({
      message: "Investments retrieved successfully",
      investments: investments,
    });
  } catch (error) {
    // Handle any errors

    return res.status(500).json({ message: "Internal server error" });
  }
};