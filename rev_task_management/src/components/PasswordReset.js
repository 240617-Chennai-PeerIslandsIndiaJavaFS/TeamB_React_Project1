import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/PasswordResetCss.css";

// import logo from '../Media/logo.png';

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !oldPassword || !newPassword) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .put("http://localhost:3001/admin/resetPassword", { email, newPassword })
      .then((response) => {
        console.log("Password reset response:", response.data);
        alert("Password updated successfully!");
        // Redirect to login page or another page after successful reset
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("There was an error resetting the password!", error);
        alert("There was an error resetting the password!");
      });
  };

  return (
    <div className="passwordreset">
      <button className="go-back-button" onClick={() => window.history.back()}>
        Go Back
      </button>
      <div className="flex-container">
        <img src="/MEDIA/akshay logo.png" alt="Logo" className="logo1" />
        <div className="login-container1">
          <h1 className="h1styles">Welcome to Task Management</h1>
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label1">
                Email address
              </label>
              <input
                type="email"
                className="form-control2"
                id="exampleInputEmail1"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputOldPassword1" className="form-label1">
                Old Password
              </label>
              <input
                type="password"
                className="form-control2"
                id="exampleInputOldPassword1"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputNewPassword1" className="form-label1">
                New Password
              </label>
              <input
                type="password"
                className="form-control2"
                id="exampleInputNewPassword1"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
            </div>

            <div className="button-containers">
              <button type="submit" className="loginbutton1">
                Reset
              </button>
            </div>
          </form>
          <div id="message"></div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;