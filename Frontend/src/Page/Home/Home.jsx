import React from "react";
import { FaBriefcase, FaBuilding, FaGraduationCap, FaChalkboardTeacher, FaMicrophone, FaFileAlt } from "react-icons/fa"; // Import relevant icons
import { CiVideoOn } from "react-icons/ci";
import '../../pageStyle/home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const JobPage = () => {
    navigate("/jobs")
  }
  return (
    <div className="home-box">
      <div className="hero">
        <div className="hero-box">
          <div className="headers">
            <span>Build Your Dream Career with</span>
          </div>
          <div className="headers-2">
            <span>Opportunities && Growth</span>
          </div>
          <div className="summrey">
            <p>
              Connect with top employers, explore job opportunities, and power
              your career with our comprehensive job portal.
            </p>
          </div>

          <div className="paymet-page">
            <button className="paymet-call" onClick={JobPage}>Start Your Journey</button>
          </div>

          <div className="imga-hero">
            <img
              src="https://www.zegocloud.com/_nuxt/img/img_index_banner.03ccd64.png"
              alt="Career growth"
            />
          </div>
        </div>
      </div>

      <div className="product">
        <span className="products"> Our Features </span>

        <div className="Success">
          <p>
            The Ultimate Job Search Engine Purposefully Designed for Your Career Success
          </p>
        </div>
        <div className="summry-of-product">
          <p>
            Our platform accelerates your job search with tailored features,
            career guidance, and skill enhancement tools.
          </p>
        </div>
      </div>


      <div className="product-box">
        <div className="box-type">
          <div className="icons">
            <FaBriefcase /> {/* Icon for Job Listings */}
          </div>
          <div className="text-type">
            <p className="product-text">Job Listings</p>
            <p className="online-mark">Updated Daily</p>
          </div>
        </div>

        <div className="box-type">
          <div className="icons">
            <FaBuilding /> {/* Icon for Company Insights */}
          </div>
          <div className="text-type">
            <p className="product-text">Company Insights</p>
            <p className="online-mark">Transparent Reviews</p>
          </div>
        </div>

        <div className="box-type">
          <div className="icons">
            <FaGraduationCap /> {/* Icon for Career Resources */}
          </div>
          <div className="text-type">
            <p className="product-text">Career Resources</p>
            <p className="online-mark">For Growth</p>
          </div>
        </div>

        <div className="box-type">
          <div className="icons">
            <FaChalkboardTeacher /> {/* Icon for Skill Training */}
          </div>
          <div className="text-type">
            <p className="product-text">Skill Training</p>
            <p className="online-mark">Enhance Skills</p>
          </div>
        </div>

        <div className="box-type">
          <div className="icons">
            <FaMicrophone /> {/* Icon for Mock Interviews */}
          </div>
          <div className="text-type">
            <p className="product-text">Mock Interviews</p>
            <p className="online-mark">Practice Now</p>
          </div>
        </div>

        <div className="box-type">
          <div className="icons">
            <FaFileAlt /> {/* Icon for Resume Builder */}
          </div>
          <div className="text-type">
            <p className="product-text">Resume Builder</p>
            <p className="online-mark">Stand Out</p>
          </div>
        </div>
      </div>

      <div className="product">
        <span className="products"> Designed for Every Job Seeker </span>

        <div className="Success">
          <p>
            Personalized Experience Tailored to Freshers and Professionals
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
