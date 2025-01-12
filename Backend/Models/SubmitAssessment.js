const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    assessmentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, required: true },
    repoLink: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    company: { type: String, default: "" },
    meetDate: { type: String, default: "" },
    round: { type: String, default: "" },
    Admin: { type: String, required: true },
    time: { type: String, default: 12 },
    scheduledDate: { type: String, default: "" },
  },
  { timestamps: true }
);

const AssessmentSubmitModel = mongoose.model(
  "AssessmentSubmit",
  assessmentSchema
);

module.exports = AssessmentSubmitModel;
