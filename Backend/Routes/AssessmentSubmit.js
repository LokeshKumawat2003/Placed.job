const express = require("express");
const AssessmentSubmitModel = require("../Models/SubmitAssessment");
const jwt = require("jsonwebtoken");
const assessmentSubmit = express.Router();
require("dotenv").config();
assessmentSubmit.post("/assessments/admin", async (req, res) => {
  try {
    const newAssessment = new AssessmentSubmitModel(req.body);

    const savedAssessment = await newAssessment.save();
    res.status(201).json(savedAssessment);
  } catch (error) {
    res.status(400).json({ message: "Error creating assessment", error });
  }
});

assessmentSubmit.get("/assessments/admin", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = jwt.verify(token,  process.env.TOKEN_KEY);
    if (!user) {
      return res.status(403).json({ message: "Forbidden" });
    }
    let Admin = user.userId;
   
    
    const assessments = await AssessmentSubmitModel.find({ Admin });
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assessments", error });
  }
});

assessmentSubmit.get("/assessments", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = jwt.verify(token,  process.env.TOKEN_KEY);
    if (!user) {
      return res.status(403).json({ message: "Forbidden" });
    }
    let userId = user.userId;
    const assessments = await AssessmentSubmitModel.find({ userId });
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assessments", error });
  }
});

assessmentSubmit.put("/assessments/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAssessment = await AssessmentSubmitModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedAssessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    res.status(200).json(updatedAssessment);
  } catch (error) {
    res.status(400).json({ message: "Error updating assessment", error });
  }
});

module.exports = assessmentSubmit;
