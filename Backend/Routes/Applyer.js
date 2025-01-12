const express = require("express");
const jwt = require("jsonwebtoken");
const ApplyModel = require("../Models/ApplyerModel");
const jobApply = express.Router();
require("dotenv").config();


jobApply.get("/apply", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token,  process.env.TOKEN_KEY); 
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    let Admin = decodedToken.userId;
  

    const applications = await ApplyModel.find({ Admin });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

jobApply.post("/apply", async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: No token provided" });
    }

    let userId;
    try {
      const decoded = jwt.verify(token,  process.env.TOKEN_KEY);
      userId = decoded.userId;
    } catch (error) {
      console.error("Invalid Token:", error);
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    const payload = {
      ...req.body,
      userId: userId,
    };

    const data = await new ApplyModel(payload).save();
    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({
      message: "Failed to create application due to server error.",
      error: error.message,
    });
  }
});

module.exports = jobApply;
