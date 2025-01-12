const express = require("express");
const bcrypt = require("bcrypt");
const SignupModle = require("../Models/SignupModel");

const signupRoute = express.Router();

signupRoute.get("/signup", async (req, res) => {
  try {
    const data = await SignupModle.find();
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(400).json({ message: "user fetching issue", error });
  }
});

signupRoute.post("/signup", async (req, res) => {
  const { name, email, number, password, role } = req.body;
  try {
    if (!name || !email || !number || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const checkUser = await SignupModle.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new SignupModle({
      name,
      email,
      number,
      password: hashPassword,
      role,
    });
    const saveUser = await newUser.save();
    res.status(201).json({ users: saveUser });
    console.log(saveUser);
  } catch (error) {
    res.status(400).json({ message: "user  signup post request issue", error });
  }
});

module.exports = signupRoute;
