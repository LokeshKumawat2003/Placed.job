const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "User" },
});

const SignupModle = mongoose.model("Users", SignupSchema);
module.exports = SignupModle;
