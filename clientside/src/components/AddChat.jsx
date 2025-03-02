import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from "../api/ApiConfig";
import '../scss/AddChat.scss';
import { useNavigate } from 'react-router-dom';

const AddChat = () => {
    const navigate=useNavigate()
  const [users, setUsers] = useState([]);
  const token=localStorage.getItem('token')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${api}/getUsers`, {
            headers: { Authorization: `Bearer ${token}` },
          }); 
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="add-chat">
      <h2 className="add-chat-title">Start a New Chat</h2>
      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user._id} onClick={() => navigate(`/chatPage/${user._id}`)}>
            <img
              src={user.profile}
              alt={`${user.username}'s profile`}
              className="user-profile-pic"
            />
            <div className="user-info">
              <h3 className="user-name">{user.username}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddChat;
