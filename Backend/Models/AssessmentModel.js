// const mongoose = require("mongoose");


// const AssessmentSchema = new mongoose.Schema({
//   assessmentText: { type: String, required: true },
//   studentId: { type: String, required: true },
//   jobId: { type: String, required: true },
//   fullName: { type: String, required: true },
//   Admin: { type: String, required: true },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },


const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
  assessmentText: { type: String, required: true },
  studentId: { type: String, required: true },
  jobId: { type: String, required: true },
  fullName: { type: String, required: true },
  Admin: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  StartTime: {
    type: String,
    default: () => {
      const currentDate = new Date();
      return `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    }
  },
  endTime: {
    type: String,
    default: () => {
      const currentDate = new Date();
      return `${currentDate.getDate()+10}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    }
  }
});

const AssessmentModel = mongoose.model("Assessment", AssessmentSchema);
module.exports = AssessmentModel;
