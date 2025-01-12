const express = require("express");
const JobModel = require("../Models/JobPostModel");
const jwt = require("jsonwebtoken");
const jobPost = express.Router();
require("dotenv").config();
jobPost.get("/jobpost", async (req, res) => {
  try {
    const data = await JobModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch job posts", error });
  }
});

jobPost.post("/jobpost", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token,  process.env.TOKEN_KEY);

    req.body.Admin = decoded.userId;

    const newJobPost = new JobModel(req.body);
    await newJobPost.save();

    res.status(201).json(newJobPost);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create job post", error: err.message });
    console.error(err);
  }
});

module.exports = jobPost;
