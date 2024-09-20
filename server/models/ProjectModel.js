const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true,
    },
    project_picture: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
  required_investment: {
    type: Number,
    required: true,
  },
  invested_amount: {
    type: Number,
    required: true,
  },
//   project_duration: {
//     type: Number,
//     required: true,
//   },
project_duration: {
    type: String,
    required: true, 
  },
  createdAt: {
      type: Date,
      default: Date.now,
  } ,
  showAmounts:{
    type: Boolean,
    default: false,
  },
  is_profit_calculated:{
    type: Boolean,
    default: false,
  },
});

const Project = mongoose.model("Projects", projectSchema);

module.exports = Project;
