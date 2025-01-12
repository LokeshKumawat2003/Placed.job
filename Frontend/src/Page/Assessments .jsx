import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pageStyle/assessments.css";
import { toast } from "react-toastify";
import Loader from './../Components/Loader';
import { useUrl } from "../context/UrlContext";

const Assessments = () => {
  const { url } = useUrl();
  const [assessmentData, setAssessmentData] = useState([]);
  const [post, setPost] = useState([]);
  const [repoLinks, setRepoLinks] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAssessmentData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const assessmentResponse = await axios.get(
          `${url}/api/assessment`,
          config
        );
        setAssessmentData(assessmentResponse.data);

        const postResponse = await axios.get(
         `${url}/api/jobpost`,
          config
        );
        setPost(postResponse.data);
      } catch (error) {
        console.error("Error fetching assessment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessmentData();
  }, []);


  const handleInputChange = (assessmentId, value) => {

    setRepoLinks((prev) => ({
      ...prev,
      [assessmentId]: value,
    }));
  };

  const handleSubmit = async (assessmentId) => {
    // console.log(assessmentId)
    const repoLink = repoLinks[assessmentId._id] || "";


    if (!repoLink.trim()) {
      toast("Please enter a valid GitHub repository link.");
      return;
    }

    let obj = {
      name: assessmentId.fullName,
      assessmentId: assessmentId._id,
      jobId: assessmentId.jobId,
      repoLink: repoLink,
      Admin: assessmentId.Admin,
      userId: assessmentId.userId
    }
    toast("Assessment Submit")

    const SendAssesssment = await axios.post(`${url}/api/assessments/admin`, obj)

  };

  if (loading) {
    return <p ><Loader /></p>;
  }

  return (
    <div className="assessments-page">
      <div className="assessment-box">
        <div className="assessment-header">
          <h1 className="assessment-title">
            Assignments <span className="company-label">Given by Companies</span>
          </h1>
        </div>

        <div className="assessment-container">
          {assessmentData.length === 0 ? (
            <p className="no-assessments-text">No assessments available.</p>
          ) : (
            assessmentData.map((assessment) => {
              const correspondingPost = post.find((el) => el._id === assessment.jobId);

              return (
                <div className="assessment-item" key={assessment._id}>
                  <div className="company-info">
                    {correspondingPost && (
                      <div className="company-details">
                        <img
                          src={correspondingPost.companyImage}
                          alt={correspondingPost.companyName}
                          className="company-logo"
                        />
                        <p className="company-name">
                          Name:{" "}
                          <a
                            href={correspondingPost.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="company-link"
                          >
                            {correspondingPost.companyName}
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="assessment-content">

                    <div className="assessment-dates">
                      <p className="date-range">
                        Date: <span>{assessment.StartTime}</span> To
                        <span> {assessment.endTime}</span>
                      </p>
                    </div>
                    <div className="assessment-actions">


                      <a

                        href={assessment.assessmentText}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-assessment-link"
                      >
                        <button className="view-assessment-btn"> View Assessment</button>
                      </a>

                      <div className="assessment-submit">
                        <input
                          type="text"
                          placeholder="Enter GitHub Repo link"
                          className="github-input"
                          value={repoLinks[assessment._id] || ""}
                          onChange={(e) => handleInputChange(assessment._id, e.target.value)}
                        />
                        <button
                          className="submit-btn"
                          onClick={() => handleSubmit(assessment)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessments;
