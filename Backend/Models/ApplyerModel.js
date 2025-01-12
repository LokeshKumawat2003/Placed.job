const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    developerType: {
      type: String,
      required: true,
    },
    assessmentSent: {
      type: Boolean,
      default: false,
    },
    languages: {
      type: [String],
      default: [],
    },
    resumeLink: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: false,
    },
    githubLink: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: false,
    },

    Admin: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", jobApplicationSchema);

module.exports = Application;
