import React, { useEffect, useState } from "react";
import "../componentsStyle/navbar.css";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useUrl } from "../context/UrlContext";

const Navbar = () => {
  const [userRole, setUserRole] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { url } = useUrl();
  const menuOptions = {
    admin: [
      { name: "Company", path: "/company" },
      { name: "Appliers", path: "/appliers" },
      { name: "Schedule", path: "/schedule" },
    ],
    user: [
      { name: "Jobs", path: "/jobs" },
      { name: "Assessments", path: "/assessments" },
      { name: "Interview", path: "/interview" },
      { name: "Challenges", path: "/challenges" },
    ],
  };
  const NaveToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        const userID = localStorage.getItem("userID");
        if (token && userID) {
          const response = await fetch(`${url}/api/signup`);
          const data = await response.json();
          const user = data.data.find((el) => el._id === userID);
          if (user) {
            setUserRole(user.role);
          }
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, [NaveToken]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const routes = userRole === "Admin" ? menuOptions.admin : menuOptions.user;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => handleNavigation("/")}>
          <h1>Placed.job</h1>
        </div>

        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          {routes.map((route, index) => (
            <NavLink
              key={index}
              to={route.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setIsMenuOpen(false)}
            >
              {route.name}
            </NavLink>
          ))}
          <div
            className="navbar-login"
            onClick={() =>
              handleNavigation(localStorage.getItem("token") ? "/profile" : "/login")
            }
          >
            <span>{localStorage.getItem("token") ? "Profile" : "Login"}</span>
            <FaRegUserCircle />
          </div>
        </div>

        <div
          className={`navbar-menu-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;