const express = require("express");

const router = express.Router();

const {
  signUpData,
  login,
  resetPassword,
  forgotPassword,
  verifyEmail,
  redirect,
  getUserById,
  getAllUsers,
  updateUserRole,
  updateUserIsActive,
  removeUser,
  updateUserData,
  findUserByIdForValidation
} = require("../Controllers/signIn");
const { auth, isMember, isAdmin } = require("../middlewares/auth");
const {
  addProject,
  getAllProjects,
  getAdminProjectById,
  updateProject,
  addInvestment,
} = require("../Controllers/Projects");
const {
  getProjects,
  getProjectById,
} = require("../Controllers/GettingProjects");
const { createBankAccount } = require("../Controllers/AdminAccountDetail");
const { gettingBankAccount } = require("../Controllers/AdminAccountDetail");
const {
  createInvestmentProfile,
  getInvestmentProfiles,
  updateInvestmentProfileIsActive,
  updateInvestmentProfileById,
  deleteProject,
  getInvestmentProfilesByUserAndProject,
  calculateProfitPercentage,
  calculateProfitPercentageForAllUsers,
  checkInvestmentTime,
  setWithdrawFlagForInvestmentProfiles,
  deleteInvestmentProfile,
  getInvestmentProfilesWithProjectNames,
  getWithdrawnInvestmentProfiles,
  getWithDrawInvestmentProfileById,
  getWithdrawnInvestmentProfileByUserAndProject,
  fetchProfitLossByDate,
  calculateUserCapital,
  // calculateUserCapitalById,
} = require("../Controllers/InvestmentProfile");
const {
  createInvestment,
  updateInvestment,
  updateInvestmentById,
  updateInvestmentStatusById,
  getInvestmentsByProfileIds
} = require("../Controllers/Investments");
const {
  createReceipt,
  getAllReceipts,
  getReceiptById,
  updateReceiptIsDeleted,
  getReceiptDetailsById,
  updateReceiptId,
  getReceiptsByInvestmentProfileIds
} = require("../Controllers/InvestmentReceipt");
const {

  addTransactionId,
  updateTransactionId,
  updateReceiptTransctionId,
} = require("../Controllers/ApproveReceipt");
const {gettingAllProfitsAndLoss,subtractAmountFromProfit,subtractAmountFromDonation,createProfitLossEntry,getAllProfitLossEntries} = require("../Controllers/ProfitLossController")
const {withdrawFindById,getAllWithdraws,withdrawFindByIdAndDelete,withdrawFindByIdStatement} = require("../Controllers/WithDraw")
const {createApprovedWithdrawal,getAllApprovedWithdrawals,getApprovedWithdrawalById} = require("../Controllers/ApprovedWithdrawal")
const {createDonation,getAllDonations} = require("../Controllers/MemberDonation")

router.post("/signUp", signUpData);
router.post("/loginPage", login);

router.get("/checkUser/:id",findUserByIdForValidation)
 //router.get("/verifyEmail/:token", verifyEmail, redirect); // Verify email and redirect

router.post("/resetPassword", resetPassword);
router.post("/forgotPassword", forgotPassword);

router.get("/member", auth, isMember, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected route for Member",
  });
});
// router.get("/user/:id", getUserById);

router.get("/member/getprojects", getProjects);
router.get("/member/getprojectbyid/:id", getProjectById);
router.get("/member/bankAccount", gettingBankAccount);
router.post("/member/investmentProfile", createInvestmentProfile);
router.post("/member/investments", createInvestment);
router.post("/member/receipt", createReceipt);
router.post("/member/investmentProfiles", getInvestmentProfiles);
router.post("/member/updatereceipt", updateReceiptIsDeleted);
router.post("/member/getInvestmentProfilesByUserAndProject",getInvestmentProfilesByUserAndProject)
router.post("/member/getReceiptsByInvestmentProfileIds",getReceiptsByInvestmentProfileIds)
router.post("/member/getInvestmentsByProfileIds",getInvestmentsByProfileIds)
router.post("/member/updateUserData",updateUserData)
router.post("/member/updatinginvestmentprofile",updateInvestmentProfileIsActive);
router.post("/member/gettingAllProfitsAndLoss",gettingAllProfitsAndLoss)
router.post("/member/checkInvestmentTime",checkInvestmentTime)
router.post("/member/setWithdrawFlagForInvestmentProfiles",setWithdrawFlagForInvestmentProfiles)
router.get("/member/getInvestmentProfilesWithProjectNames/:id",getInvestmentProfilesWithProjectNames)
router.post("/member/createDonation",createDonation)
router.get("/member/withdrawFindByIdStatement/:id",withdrawFindByIdStatement)

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected route for Admin ",
  });
});
//router.post("/admin/calculateUserCapitalById", calculateUserCapitalById);
router.post("/admin/project", addProject);
router.post("/admin/bankAccount", createBankAccount);
router.post("/admin/addTransactionId", addTransactionId);
router.get("/admin/gettingallreceipts", getAllReceipts);
router.get("/admin/getreceiptbyid/:id", getReceiptById);
router.post("/admin/calculateUserCapital", calculateUserCapital);

router.delete('/admin/users/:id', removeUser);
router.get('/investment-profiles/project/:id', getInvestmentProfilesWithProjectNames);

router.post("/admin/updatinginvestment", updateInvestment);
router.get("/admin/gettingallusers", getAllUsers);
router.post("/admin/updatinguserrole", updateUserRole);
router.get("/admin/gettingallprojects", getAllProjects);
// router.post("/admin/deleteproject/:id", deleteProject);
router.get("/admin/getprojectbyid/:id", getAdminProjectById);
router.post("/admin/updateproject/:id", updateProject);
router.get("/admin/getreceiptdetailsbyid/:id", getReceiptDetailsById);
router.post("/admin/updateInvestmentProfileById", updateInvestmentProfileById);
router.post("/admin/updateInvestmentById", updateInvestmentById);
router.post("/admin/updateReceiptId", updateReceiptId);
router.post("/admin/addInvestment", addInvestment);
router.post("/admin/updateInvestmentStatusById", updateInvestmentStatusById);
router.post("/admin/deleteProject/:id", deleteProject);
router.post("/admin/updateUserIsActive",updateUserIsActive)
router.get("/admin/getUserById/:id", getUserById);
router.post("/admin/calculateProfitPercentage",calculateProfitPercentage)
router.post("/admin/profitlossbydate", fetchProfitLossByDate);
router.post("/admin/calculateProfitPercentageForAllUsers",calculateProfitPercentageForAllUsers)
router.post("/admin/deleteInvestmentProfile",deleteInvestmentProfile)
router.get("/admin/getWithdrawnInvestmentProfiles",getWithdrawnInvestmentProfiles)
router.get("/admin/getWithDrawInvestmentProfileById/:id",getWithDrawInvestmentProfileById)
router.get("/admin/getAllWithdraws",getAllWithdraws)
router.get("/admin/withdrawFindById/:id",withdrawFindById)
router.post("/admin/withdrawFindByIdAndDelete",withdrawFindByIdAndDelete)
router.post("/admin/subtractAmountFromProfit",subtractAmountFromProfit)
router.post("/admin/createApprovedWithdrawal",createApprovedWithdrawal)
router.get("/admin/getAllApprovedWithdrawals",getAllApprovedWithdrawals)
router.get("/admin/getApprovedWithdrawalById/:id",getApprovedWithdrawalById)
router.post("/admin/subtractAmountFromDonation",subtractAmountFromDonation)
router.get("/admin/getAllDonations",getAllDonations)
router.post("/admin/createProfitLossEntry",createProfitLossEntry)
router.get("/admin/getAllProfitLossEntries",getAllProfitLossEntries)
module.exports = router;
