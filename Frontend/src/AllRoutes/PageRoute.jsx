import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "../Page/ErrorPage";
import Challenges from "../Page/Challenges";
import Assessments from "../Page/Assessments ";
import Navbar from "../Components/Navbar";
import Jobs from "../Page/Job";
import Home from "../Page/Home/Home";
import Interview from "../Page/Interview";
import ProfileStudent from "../Page/ProfileStudent";
import Login from "../Page/Login";
import Signup from "../Page/Signup";
import CompanyAdmin from "../Page/CompanyAdminPage/CompanyAdmin";
import Appliers from "../Page/CompanyAdminPage/Appliers";
import InterviewSchedule from "../Page/CompanyAdminPage/InterviewSchedule";
import PrivetRoutes from "./PrivetRoutes";


const PageRoute = () => {
  return (
    <div>
      <Navbar />
      <div className="pages" style={{ marginTop: "40px" }}>
        <Routes>
          <Route path="/company" element={< PrivetRoutes Component={CompanyAdmin} />} />
          <Route path="/appliers" element={< PrivetRoutes Component={Appliers} />} />
          <Route path="/Schedule" element={< PrivetRoutes Component={InterviewSchedule} />} />
          <Route path="/" element={<  Home />} />
          <Route path="/jobs" element={< PrivetRoutes Component={Jobs} />} />
          <Route path="/assessments" element={< PrivetRoutes Component={Assessments} />} />
          <Route path="/challenges" element={< PrivetRoutes Component={Challenges} />} />
          <Route path="/interview" element={< PrivetRoutes Component={Interview} />} />
          <Route path="/profile" element={<ProfileStudent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default PageRoute;
