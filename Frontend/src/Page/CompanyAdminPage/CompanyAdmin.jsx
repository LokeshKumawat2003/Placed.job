import React, { useState } from "react";
import "./../../pageStyle/CompanyAdmin/companyAdmin.css";
import axios from 'axios';
import { toast } from "react-toastify";
import { useUrl } from "../../context/UrlContext";

const CompanyAdmin = () => {
  const { url } = useUrl();
  const [formData, setFormData] = useState({
    developerType: "",
    companyImage: "",
    companyName: "",
    companyWebsite: "",
    location: "",
    lpa: "",
    hireCount: "",
    languages: [],
    expiryDate: "",
  });

  const [languageInput, setLanguageInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addLanguage = () => {
    if (languageInput.trim() && !formData.languages.includes(languageInput)) {
      setFormData({
        ...formData,
        languages: [...formData.languages, languageInput.trim()],
      });
      setLanguageInput("");
    }
  };

  const removeLanguage = (language) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((lang) => lang !== language),
    });
  };

  let token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/jobpost`, formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast('Job post submitted successfully!');
    } catch (error) {
      toast('Error submitting job post: ' + error.message);
    }
  };

  return (
    <div className="company-admin-container">
      <div className="company-admin-header">
        <h1 className="company-admin-title">Create Job Post</h1>
      </div>

      <form className="company-admin-form" onSubmit={handleSubmit}>
        <div className="company-admin-section developer-type-section">
          <label className="developer-type-label">Developer Type</label>
          <input
            className="developer-type-input"
            type="text"
            name="developerType"
            value={formData.developerType}
            onChange={handleChange}
            placeholder="Enter developer type"
            required
          />
        </div>

        <div className="company-admin-section company-image-section">
          <label className="company-image-label">Company Image URL</label>
          <input
            className="company-image-input"
            type="url"
            name="companyImage"
            value={formData.companyImage}
            onChange={handleChange}
            placeholder="Enter company image URL"
          />
        </div>

        <div className="company-admin-section company-name-section">
          <label className="company-name-label">Company Name</label>
          <input
            className="company-name-input"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />
        </div>

        <div className="company-admin-section company-website-section">
          <label className="company-website-label">Company Website</label>
          <input
            className="company-website-input"
            type="url"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            placeholder="Enter company website URL"
            required
          />
        </div>

        <div className="company-admin-section location-section">
          <label className="location-label">Location</label>
          <input
            className="location-input"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </div>

        <div className="company-admin-section lpa-section">
          <label className="lpa-label">LPA</label>
          <input
            className="lpa-input"
            type="number"
            name="lpa"
            value={formData.lpa}
            onChange={handleChange}
            placeholder="Enter LPA"
            required
          />
        </div>

        <div className="company-admin-section hire-count-section">
          <label className="hire-count-label">Number of Month</label>
          <input
            className="hire-count-input"
            type="number"
            name="hireCount"
            value={formData.hireCount}
            onChange={handleChange}
            placeholder="Enter number of hires"
            required
          />
        </div>

        <div className="company-admin-section languages-section">
          <label className="languages-label">Languages Required</label>
          <div className="languages-input-container">
            <input
              className="languages-input"
              type="text"
              value={languageInput}
              onChange={(e) => setLanguageInput(e.target.value)}
              placeholder="Add a language"
            />
            <button
              className="languages-add-btn"
              type="button"
              onClick={addLanguage}
            >
              Add
            </button>
          </div>

          <div className="languages-list">
            {formData.languages.map((lang, index) => (
              <div className="language-item" key={index}>
                <span className="language-name">{lang}</span>
                <button
                  className="language-remove-btn"
                  type="button"
                  onClick={() => removeLanguage(lang)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="company-admin-section expiry-date-section">
          <label className="expiry-date-label">Post Expiry Date</label>
          <input
            className="expiry-date-input"
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="company-admin-section submit-section">
          <button className="submit-btn-action" type="submit">
            Submit Job Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyAdmin;
