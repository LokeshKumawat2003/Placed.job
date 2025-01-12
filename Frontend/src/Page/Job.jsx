import React, { useEffect, useState } from "react";
import "../pageStyle/job.css";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import { useUrl } from "../context/UrlContext";

const Jobs = () => {
  const { url } = useUrl();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobdata, setJobdata] = useState(null);
  const [applyingJobs, setApplyingJobs] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleApply = async (job) => {
    if (!jobdata?._id) {
      alert("User profile data is missing. Please try again.");
      return;
    }

    const applicationData = {
      jobId: job._id || "",
      fullName: jobdata.fullName || "",
      address: jobdata.address || "",
      qualification: jobdata.qualification || "",
      developerType: jobdata.developerType || "",
      assessmentSent: false,
      languages: jobdata.languages || [],
      resumeLink: jobdata.resumeLink || "",
      profilePhoto: jobdata.profilePhoto || "",
      githubLink: jobdata.githubLink || "",
      Admin: job.Admin || "",
    };

    setApplyingJobs((prev) => ({ ...prev, [job._id]: true }));

    try {
      const response = await axios.post(`${url}/api/apply`, applicationData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast(response.data.message || "Application successful!");
    } catch (error) {
      console.error("Error applying for the job:", error.response || error);
      alert(error.response?.data?.message || "Failed to apply. Please try again.");
    } finally {
      setApplyingJobs((prev) => ({ ...prev, [job._id]: false }));
    }
  };

  useEffect(() => {
    if (token) {
      fetchApi();
      fetchProfile();
    } else {
      setError("You need to log in to view jobs.");
    }
  }, [token]);


  console.log(`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`);
  



  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/jobpost`);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch job posts. Please try again later.");
      console.error("Error fetching job posts:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${url}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobdata(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Update The Profile Data ");
      console.error("Error fetching profile:", error.response || error);
    }
  };

  const filteredJobs = data.filter((job) => {
    const matchesSearch = searchTerm
      ? job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.developerType?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesJobType = jobType
      ? job.developerType?.toLowerCase() === jobType.toLowerCase()
      : true;

    return matchesSearch && matchesJobType;
  });

  return (
    <div className="jobs-container-unique">
      <header className="job-header-unique">
        <h1>
          Find Your <span>Dream Job</span>
        </h1>
      </header>

      <div className="filter-container-unique">
        <select
          className="job-type-select-unique"
          name="job-type"
          id="job-type"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="">All Job Types</option>
          <option value="Frontend">Frontend Developer</option>
          <option value="Backend">Backend Developer</option>
          <option value="FullStack">Full Stack Developer</option>
        </select>

        <div className="search-container-unique">
          <input
            type="text"
            className="search-input-unique"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CiSearch className="search-icon-unique" />
        </div>
      </div>

      <div className="job-listings-unique">
        {loading ? (
          <div className="loading-message-unique">
           <Loader/>
          </div>
        ) : error ? (
          <div className="error-message-unique">
            <p>{error}</p>
          </div>
        ) : (
          <div className="job-cards-unique">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div className="job-card-unique" key={job._id}>
                  <div className="job-card-header-unique">
                    <img
                      className="company-logo-unique"
                      src={job.companyImage}
                      alt={`${job.companyName} Logo`}
                    />
                    <a href={job.companyWebsite}>
                      <h3>{job.companyName}</h3>
                    </a>
                  </div>

                  <div className="job-details-unique">
                    <p>
                      Position: <span>{job.developerType}</span>
                    </p>
                    <p>
                      Location: <span>{job.location}</span>
                    </p>
                    <p>
                      Languages: <span>{job.languages?.join(", ") || "Not Specified"}</span>
                    </p>
                    <p>
                      Salary Range: <span>{job.lpa} LPA</span>
                    </p>
                    <p>
                      Duration of month: <span>{job.hireCount}</span>
                    </p>
                  </div>

                  <div className="job-footer-unique">
                    <button
                      className="apply-button-unique"
                      onClick={() => handleApply(job)}
                      disabled={applyingJobs[job._id]}
                    >
                      {applyingJobs[job._id] ? "Applying..." : "Apply Now"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-jobs-unique">
                <p>No jobs found matching your search criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
