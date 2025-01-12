const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  developerType: {
    type: String,
    required: true,
  },
  companyImage: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyWebsite: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  lpa: {
    type: Number,
    required: true,
    min: [0, "LPA must be a positive number"],
  },
  hireCount: {
    type: Number,
    required: true,
    min: [1, "Number of hires must be at least 1"],
  },
  languages: {
    type: [String],
    required: true,
  },
  Admin:{
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return v > Date.now();
      },
      message: "Post expiry date must be in the future!",
    },
  },
});

const JobModel = mongoose.model("JobPost", jobSchema);

module.exports = JobModel;
