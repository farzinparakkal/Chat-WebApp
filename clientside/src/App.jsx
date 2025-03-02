import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyEmail";
import VerifyPassEmail from "./components/VerifyPassEmail";
import EmailNotification from "./components/EmailNotification";
import Register from "./components/Register";
import Nav from "./components/Nav";
import AddChat from "./components/AddChat";
import ChatPage from "./components/ChatPage";
import Profile from "./components/Profile";
import ViewProfile from "./components/ViewProfile";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [profile, setProfile] = useState(null);
  const [name,setName]=useState("")
  const location = useLocation(); 
  const isChatPage = location.pathname.startsWith("/chatPage");

  return (
    <>
      {profile && !isChatPage && <Nav profile={profile} setName={setName} />}
      <Routes>
        <Route path="/" element={<Home setProfile={setProfile} name={name} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/verifyPassEmail" element={<VerifyPassEmail />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/emailNotification" element={<EmailNotification />} />
        <Route path="/addChat" element={<AddChat />} />
        <Route path="/chatPage/:id" element={<ChatPage />} />
        <Route path="/viewProfile/:id" element={<ViewProfile />} />
      </Routes>
    </>
  );
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default WrappedApp;
