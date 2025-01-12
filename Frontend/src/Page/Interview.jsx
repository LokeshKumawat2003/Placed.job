import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pageStyle/interview.css';
import Loader from '../Components/Loader';
import { useUrl } from '../context/UrlContext';

const Interview = () => {
  const { url } = useUrl();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token =localStorage.getItem("token"); 
  
    axios.get(`${url}/api/assessments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setInterviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching interviews:', error);
        setError('Failed to load interviews');
        setLoading(false);
      });
  }, []);
  

  if (loading) {
    return <div><Loader/></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="interview-container">
      <header className="interview-header">
        <h1 className="interview-title">Upcoming Interviews</h1>
        <p className="interview-subtitle">Stay prepared and shine in your interviews!</p>
      </header>

      <div className="interview-cards">
        {interviews.map((interview, index) => (
          <div className="interview-card" key={index}>
            <div className="card-header">
              <h2 className="company-name">{interview.company}</h2>
            </div>
            <div className="card-body">
              <p className="interview-detail"><strong>Date:</strong> {interview.scheduledDate}</p>
              <p className="interview-detail"><strong>Time:</strong> {interview.time}</p>
              <p className="interview-detail"><strong>Rounds:</strong> {interview.round}</p>
            </div>
            <div className="card-footer">
              <a
                href={interview.meetDate}
                target="_blank"
                rel="noopener noreferrer"
                className="interview-link"
              >
                Join Meeting
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interview;
