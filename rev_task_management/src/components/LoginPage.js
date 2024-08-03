// LoginPage.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;

    if (!email || !password) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const users = await response.json();
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          if (user.role === "ADMIN") {
            navigate("/admin");
          } else if (user.role === "TEAM_MEMBER") {
            navigate("/team-member", { state: { user } });
          } else {
            setMessage("You do not have the required permissions.");
          }
        } else {
          setMessage("Invalid email or password.");
        }
      } else {
        setMessage("Failed to fetch users. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div id="container">
      <div className="login-container">
        <h1>Welcome to Task Management</h1>
        <form id="login-form">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control1"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control1"
              id="exampleInputPassword1"
            />
          </div>
          <div className="button-container">
            <button
              type="submit"
              className="btn loginbutton"
              style={{
                backgroundColor: "rgb(13, 170, 13)",
                borderColor: "green",
                color: "white",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "green")}
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "rgb(13, 170, 13)")
              }
              onClick={handleLogin}
            >
              Login
            </button>
            <Link to="/password-reset">
              <button
                type="button"
                className="btn loginbutton"
                style={{
                  backgroundColor: "rgb(238, 55, 10)",
                  borderColor: "green",
                  color: "white",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "red")}
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "rgb(233, 39, 8)")
                }
              >
                Reset
              </button>
            </Link>
          </div>
        </form>
        {message && <div id="message">{message}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
