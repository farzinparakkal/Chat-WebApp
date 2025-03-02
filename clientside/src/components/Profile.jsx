import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/ApiConfig";
import "../scss/Profile.scss";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    profile: "",
    username: "",
    name: "",
    email: "",
    phone: "",
    pass: "",
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${api}/getProfile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData({
          profile: response.data.data.profile || "",
          username: response.data.data.username || "",
          name: response.data.data.name || "",
          email: response.data.data.email || "",
          phone: response.data.data.phone || "",
          pass: "", // Set password to empty string
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        // navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      setProfileData({ ...profileData, profile: base64 });
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`${api}/updateProfile`,{ ...profileData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={
            profileData.profile ||
            "https://randomuser.me/api/portraits/men/1.jpg"
          }
          alt="Profile"
          className="profile-photo"
        />
        {editMode && (
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        )}
      </div>
      <div className="profile-details">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={profileData.username}
          onChange={handleInputChange}
          disabled={!editMode}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleInputChange}
          disabled={!editMode}
        />
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={profileData.phone}
          onChange={handleInputChange}
          disabled={!editMode}
        />
        {/* <label>Password</label>
        <input
          type="password"
          name="password"
          value={profileData.pass}
          onChange={handleInputChange}
          disabled={!editMode}
        /> */}
      </div>
      <div className="profile-actions">
        {editMode ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit</button>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
