const express = require("express");
const jwt = require("jsonwebtoken");
const AssessmentModel = require("../Models/AssessmentModel");
require("dotenv").config();
const assessmentSend = express.Router();

assessmentSend.post("/assessment", async (req, res) => {
  const { assessments } = req.body;

  if (!assessments || !Array.isArray(assessments) || assessments.length === 0) {
    return res.status(400).json({ message: "Invalid assessments data." });
  }

  try {
    const createdAssessments = await AssessmentModel.insertMany(assessments);
    res.status(201).json({
      message: "Assessments created successfully",
      createdAssessments,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating assessments", error });
  }
});

assessmentSend.get("/assessment", async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: No token provided" });
    }
    console.log(token)
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      userId = decoded.userId;
     
    } catch (error) {
      console.error("Invalid Token:", error);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    const DataAssessment = await AssessmentModel.find({ userId });
    res.status(200).json(DataAssessment);

  } catch (error) {
    res.status(500).json({ message: "Error fetching assessments", error });
  }
});











module.exports = assessmentSend;
