const express = require("express");
const getDb = require("./config/server");
const signupRoute = require("./Routes/SignupRoute");
const loginRoute = require("./Routes/Login");
const app = express();
app.use(express.json());

const cors = require("cors");
const jobPost = require("./Routes/JobPost");
const profile = require("./Routes/Profile");
const jobApply = require("./Routes/Applyer");
const assessmentSend = require("./Routes/AssessmentSend");
const assessmentSubmit = require("./Routes/AssessmentSubmit");

app.use(cors());

app.use("/api", signupRoute);
app.use("/api", loginRoute);
app.use("/api", jobPost);
app.use("/api", profile);
app.use("/api", jobApply);
app.use("/api", assessmentSend);
app.use("/api", assessmentSubmit);
const getServer = async () => {
  try {
    await app.listen(8080, () => {
      console.log("server is Start on Port 8080");
      getDb();
    });
  } catch (error) {
    console.log(error, "server err");
  }
};
getServer();
