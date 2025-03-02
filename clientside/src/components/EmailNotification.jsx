import React from "react";
import "../scss/EmailNotification.scss";

const EmailNotification = () => {
  return (
    <div className="verify-email-container">
      <div className="verify-email-box">
        <h1 className="title">Verify Your Email</h1>
        <p className="message">
          A verification link has been sent to your email address. Please check
          your inbox and click on the link to verify your email.
        </p>
      </div>
    </div>
  );
};

export default EmailNotification;
