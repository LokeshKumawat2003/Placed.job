const mongoose = require("mongoose");
require("dotenv").config();
const getDb = () => {
  try {
    mongoose.connect(process.env.SERVER_URI);
    console.log("MogoDb is Connected");
  } catch (error) {
    console.log(error, "MogoDb is Disconnected");
  }
};
module.exports = getDb;
