import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../pageStyle/CompanyAdmin/interviewSchedule.css";
import { toast } from "react-toastify";
import { useUrl } from "../../context/UrlContext";

const InterviewSchedule = () => {
  const { url } = useUrl();
  const [students, setStudents] = useState([]);
  const [scheduledMeet, setScheduledMeet] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [round, setRound] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchStudents = async () => {
      try {

        const response = await axios.get(`${url}/api/assessments/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudents();
  }, []);





  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleRoundChange = (event) => {
    setRound(event.target.value);
  };

  const handleScheduleMeet = (index) => {
    setSelectedIndex(index);
    console.log("Scheduled Meet:", scheduledMeet);
  };

  const handleConfirmMeet = async () => {
    if (selectedDate && round) {
      const newMeetLink = `https://meet.google.com/tde-bevh-uxf`;
      const updatedStudents = [...students];
      updatedStudents[selectedIndex].meetDate = newMeetLink;
      updatedStudents[selectedIndex].scheduledDate = selectedDate;
      updatedStudents[selectedIndex].round = round;
      setStudents(updatedStudents);

      const scheduled = {
        name: updatedStudents[selectedIndex].name,
        github: updatedStudents[selectedIndex].repoLink,
        company: updatedStudents[selectedIndex].company,
        meetLink: newMeetLink,
        scheduledDate: selectedDate,
        round: round,
      };

      setScheduledMeet([...scheduledMeet, scheduled]);


      try {
        const studentId = updatedStudents[selectedIndex]._id;
        await axios.put(`${url}/api/assessments/admin/${studentId}`, {
          meetDate: newMeetLink,
          scheduledDate: selectedDate,
          company: scheduled.company,
          round: scheduled.round,
        });
        toast("Successfully updated the student meeting.");
      } catch (error) {
        toast("Error updating the student meeting:", error);
      }

      setSelectedDate(null);
      setSelectedIndex(null);
      setRound("");
    }
  };

  const handleCompanyChange = (event) => {
    const newCompanyName = event.target.value;
    setCompanyName(newCompanyName);

    const updatedStudents = students.map((student) => ({
      ...student,
      company: newCompanyName,
    }));
    setStudents(updatedStudents);
  };

  return (
    <div className="interview-schedule-container">
      <h1 className="Student-Interviews">Student Interviews</h1>

      <div className="company-input">
        <label>Company Name: </label>
        <input
          className="company-name"
          type="text"
          value={companyName}
          onChange={handleCompanyChange}
          placeholder="Enter company name"
        />
      </div>

      <div className="scheduled-meets">
        <h3>Scheduled Meets</h3>
        <table className="student-assessments-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>GitHub</th>
              <th>Google Meet Link</th>
              <th>Scheduled Date</th>
              <th>Round</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.company}</td>
                <td>
                  <a
                    href={student.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Repo
                  </a>
                </td>
                <td>
                  {student.meetDate ? (
                    <a
                      href={student.meetDate}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Meet Link
                    </a>
                  ) : (
                    "Not Scheduled"
                  )}
                </td>
                <td>
                  {student.scheduledDate
                    ? student.scheduledDate
                    : "Not Scheduled"}
                </td>
                <td>
                  {student.round ? student.round : "Not Assigned"}
                </td>
                <td>
                  {student.meetDate ? (
                    <button className="schedule-meet-btn" disabled>
                      Scheduled
                    </button>
                  ) : (
                    <button
                      className="schedule-meet-btn"
                      onClick={() => handleScheduleMeet(index)}
                    >
                      Create Meet
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedIndex !== null && (
        <div className="date-picker-container">
          <h3>Select Meeting Date</h3>
          <label htmlFor="meet-date">Select Meeting Date:</label>
          <input
            type="date"
            id="meet-date"
            value={selectedDate || ""}
            onChange={handleDateChange}
            min={new Date().toISOString().split("T")[0]}
          />

          <label htmlFor="round">Select Round:</label>
          <select
            id="round"
            value={round}
            onChange={handleRoundChange}
          >
            <option value="">Select Round</option>
            <option value="Round 1">Round 1</option>
            <option value="Round 2">Round 2</option>
            <option value="Final Round">Final Round</option>
          </select>

          <button className="schedule-meet-btn" onClick={handleConfirmMeet}>
            Confirm Meet
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewSchedule;
