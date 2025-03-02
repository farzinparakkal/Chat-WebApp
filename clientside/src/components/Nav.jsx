import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../scss/Nav.scss";

const Nav = ({ profile, setName }) => {
  const navigate=useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    location.reload()
    navigate('/login')
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Chit-Chat</h1>
      </div>
      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search..."
          className="search-input" onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="navbar-right">
        <div className="profile-pic" onClick={toggleDropdown}>
          <img
            src={profile}
            alt="Profile"
            className="profile-img"
          />
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/profile" className="dropdown-item">
              Profile
            </Link>
            <button onClick={handleLogout} className="dropdown-item">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
