const express = require("express");
const SignupModle = require("../Models/SignupModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginRoute = express.Router();
require("dotenv").config();
loginRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await SignupModle.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id, role: user.role },  process.env.TOKEN_KEY, {
      expiresIn: "5h",
    });
  
    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user._id,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed", error });
  }
});

module.exports = loginRoute;
