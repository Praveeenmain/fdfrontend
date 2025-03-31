import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaHistory, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
import Cookies from "js-cookie";
import './index.css'
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt_token"); // Remove JWT token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      {/* Toggle Button for Mobile */}
      <button
        className="btn btn-dark d-md-none position-fixed top-0 start-0 m-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar bg-dark text-white position-fixed top-0 start-0 vh-100 p-4 ${isOpen ? "show-sidebar" : ""}`}
      >
        {/* Close Button (Mobile) */}
     

        <h2 className="fw-bold mb-4">FakeLogo  <button
          className="btn-close btn-close-white d-md-none position-absolute top-3 end-3"
          onClick={() => setIsOpen(false)}
        ></button></h2>

       

        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white d-flex align-items-center">
              <FaHome className="me-2" />
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/history" className="nav-link text-white d-flex align-items-center">
              <FaHistory className="me-2" />
              History
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link text-white d-flex align-items-center">
              <FaUser className="me-2" />
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <button
              onClick={handleLogout}
              className="btn btn-danger w-100 mt-3 d-flex align-items-center"
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
