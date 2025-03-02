import React, { useEffect, useState, useRef } from "react";
import { FaPaperPlane, FaEllipsisV } from "react-icons/fa";
import axios from "axios";
import { io } from "socket.io-client";
import api from "../api/ApiConfig";
import "../scss/ChatPage.scss";
import { useParams, useNavigate } from "react-router-dom";

const socket = io("http://localhost:3002");

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [profile, setProfile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem("token");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${api}/getReciever/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id, token]);

  useEffect(() => {
    const showMessage = async () => {
      try {
        const response = await axios.get(`${api}/getMessage/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.messages) {
          const sortedMessages = response.data.messages.sort(
            (a, b) => new Date(a.time) - new Date(b.time)
          );
          setMessages(sortedMessages);
        } else {
          console.error("No messages found");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    showMessage();
  }, [id, token]);

  useEffect(() => {
    const updateSeenStatus = async () => {
      try {
        await axios.put(`${api}/updateSeen`, { senderID: id }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Error updating seen status:", error);
      }
    };

    if (messages.length > 0) {
      updateSeenStatus();
      scrollToBottom();
    }
  }, [id, messages, token]);

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      try {
        await axios.post(
          `${api}/sendMessage`,
          {
            message: inputMessage,
            receiverID: id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInputMessage("");
        scrollToBottom();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRedirect = () => {
    navigate(`/viewProfile/${id}`);
  };

  return (
    <div className="chat-page">
      {/* Navbar */}
      <div className="navbar">
        <div className="profile">
          <img
            src={
              profile?.profile ||
              "https://randomuser.me/api/portraits/men/1.jpg"
            }
            alt="Profile"
            className="profile-pic"
          />
          <span className="username">{profile?.username || "Loading..."}</span>
        </div>
        <div className="dropdown">
          <FaEllipsisV
            className="dropdown-icon"
            onClick={handleDropdownToggle}
          />
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={handleRedirect}>View Profile</li>
            </ul>
          )}
        </div>
      </div>

      {/* Chat Display */}
      <div className="chat-display">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.senderID === id ? "received" : "sent"}`}
          >
            <div className="message-text">{msg.message}</div>
            <div className="message-time">
              {new Date(msg.time).toLocaleTimeString("en-US", { hour12: true })}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
