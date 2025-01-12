import React, { useState, useEffect } from "react";
import "../pageStyle/profileStudent.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUrl } from "../context/UrlContext";

const ProfileStudent = () => {
  const { url } = useUrl();
  const [profile, setProfile] = useState({
    fullName: "",
    address: "",
    qualification: "",
    developerType: "",
    languages: [""],
    resumeLink: "",
    githubLink: "",
    profilePhoto: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profileExists, setProfileExists] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${url}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.data) {
          setProfile(response.data);
          setProfileExists(true);
        } else {
          setProfileExists(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfileExists(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleLanguageChange = (index, value) => {
    const updatedLanguages = [...profile.languages];
    updatedLanguages[index] = value;
    setProfile({ ...profile, languages: updatedLanguages });
  };

  const addLanguageField = () => {
    setProfile({ ...profile, languages: [...profile.languages, ""] });
  };

  const handleFileUpload = (e) => {
    setProfile({ ...profile, profilePhoto: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSave = async () => {
    try {
      const apiEndpoint = profileExists
        ? `${url}/api/profile/${profile._id}`
        : `${url}/api/profile`;

      const method = profileExists ? "put" : "post";
      const response = await axios[method](apiEndpoint, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Profile updated/created successfully:", response.data);
      setProfileExists(true);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSave();
      toast("Profile Updated")
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast("User Logout")
  };

  return (
    <div className="profile-student-container">
      <h1 className="profile-student-title">Student Profile</h1>
      <div className="profile-student-card">
        {!isEditing ? (
          <>
            <div className="profile-student-photo-container">
              <img
                className="profile-student-photo"
                src={profile.profilePhoto || "https://cdn-icons-png.flaticon.com/512/8792/8792047.png"}
                alt="Profile"
              />
            </div>
            <div className="profile-student-details">
              <p><strong>Full Name:</strong> {profile.fullName}</p>
              <p><strong>Address:</strong> {profile.address}</p>
              <p><strong>Qualification:</strong> {profile.qualification}</p>
              <p><strong>Developer Type:</strong> {profile.developerType}</p>
              <p><strong>Languages:</strong> {profile.languages.join(", ")}</p>
              <p><strong>Resume:</strong> <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer">View Resume</a></p>
              <p><strong>GitHub:</strong> <a href={profile.githubLink} target="_blank" rel="noopener noreferrer">{profile.githubLink}</a></p>
            </div>
            <div className="profile-student-actions">
              <button onClick={toggleEdit} className="profile-student-edit-button">Edit Profile</button>
              <button
                onClick={handleLogout}
                className="profile-student-logout-button"
              >
                LogOut
              </button>
            </div>
          </>
        ) : (
          <form className="profile-student-form">
            <div className="profile-student-form-group">
              <label>Full Name:</label>
              <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} />
            </div>
            <div className="profile-student-form-group">
              <label>Address:</label>
              <input type="text" name="address" value={profile.address} onChange={handleChange} />
            </div>
            <div className="profile-student-form-group">
              <label>Qualification:</label>
              <input type="text" name="qualification" value={profile.qualification} onChange={handleChange} />
            </div>
            <div className="profile-student-form-group">
              <label>Developer Type:</label>
              <input type="text" name="developerType" value={profile.developerType} onChange={handleChange} />
            </div>
            <div className="profile-student-form-group">
              <label>Languages:</label>
              {profile.languages.map((language, index) => (
                <input
                  key={index}
                  type="text"
                  value={language}
                  onChange={(e) => handleLanguageChange(index, e.target.value)}
                />
              ))}
              <button
                type="button"
                onClick={addLanguageField}
                className="profile-student-add-language-button"
              >
                Add Language
              </button>
            </div>
            <div className="profile-student-form-group">
              <label>Resume Link:</label>
              <input type="text" name="resumeLink" value={profile.resumeLink} onChange={handleChange} />
            </div>
            <div className="profile-student-form-group">
              <label>GitHub Link:</label>
              <input type="text" name="githubLink" value={profile.githubLink} onChange={handleChange} />
            </div>
            <div className="profile-student-form-group">
              <label>Profile Photo:</label>
              <input type="file" onChange={handleFileUpload} />
            </div>
            <button
              type="button"
              onClick={toggleEdit}
              className="profile-student-save-button"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileStudent;