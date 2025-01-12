const mongoose = require("mongoose");


const developerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  qualification: {
    type: String,
    required: true,
    trim: true,
  },
  developerType: {
    type: String,
    required: true,
  },
  assessmentSent: { type: String, default: false }
,
  languages: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "At least one programming language is required!",
    },
  },

  resumeLink: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)[^\s]+$/.test(v);
      },
      message: "Invalid URL format for resume link!",
    },
  },
  profilePhoto: {
    type: String,
    required: false,
  },

  githubLink: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+$/.test(v);
      },
      message: "Invalid GitHub profile URL!",
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const ProfileModel = mongoose.model("DeveloperProfile", developerSchema);

module.exports = ProfileModel;
