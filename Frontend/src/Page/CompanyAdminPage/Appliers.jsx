import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../pageStyle/CompanyAdmin/appliers.css";
import { toast } from "react-toastify";
import { useUrl } from "../../context/UrlContext";

const Appliers = () => {
  const { url } = useUrl();
  const [students, setStudents] = useState([]);
  const [assessmentText, setAssessmentText] = useState("");
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  let token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`${url}/api/apply`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        toast("Failed to fetch applicants. Please try again later.");
      }
    };

    fetchApplicants();
  }, []);

  const toggleCheckbox = (studentId) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSendAssessment = async () => {
    if (!assessmentText.trim()) {
      toast("Please provide an assessment before sending.");
      return;
    }

    if (selectedStudentIds.length === 0) {
      toast("No students selected for the assessment.");
      return;
    }



    const selectedStudents = students.filter((student) =>
      selectedStudentIds.includes(student._id)
    );

    const assessments = selectedStudents.map((student) => ({

      assessmentText,
      studentId: student._id,
      jobId: student.jobId,
      Admin: student.Admin,
      fullName: student.fullName,
      userId: student.userId,
    }));

    try {
      const response = await axios.post(
        `${url}/api/assessment`,
        { assessments },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast("Assessments sent to the selected students successfully!");
      setAssessmentText("");
      setSelectedStudentIds([]);
    } catch (error) {
      console.error("Error sending assessments:", error);
      toast("Failed to send assessments. Please try again later.");
    }
  };

  return (
    <div className="appliers-container">
      <h1>Job Applicants</h1>

      <div className="assessment-input-container">
        <label htmlFor="assessmentText" className="assessment-label">
          Assessment Text/Link:
        </label>
        <input
          id="assessmentText"
          type="text"
          className="assessment-input"
          value={assessmentText}
          onChange={(e) => setAssessmentText(e.target.value)}
          placeholder="Enter assessment text or link"
        />
      </div>

      <table className="appliers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>GitHub</th>
            <th>Resume</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.fullName}</td>
              <td>
                <a
                  href={student.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </td>
              <td>
                <a
                  href={student.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedStudentIds.includes(student._id)}
                  onChange={() => toggleCheckbox(student._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="send-assessment-btn"
        onClick={handleSendAssessment}
        disabled={!assessmentText.trim() || selectedStudentIds.length === 0}
      >
        Send Assessment
      </button>
    </div>
  );
};

export default Appliers;
