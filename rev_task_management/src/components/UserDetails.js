import React, { useState } from "react";
import axios from "axios";
import "../css/Registration.css";

const UserDetails = () => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const fetchUserDetails = (e) => {
    e.preventDefault();

    setError("");

    if (!userId) {
      setError("Please enter a User ID.");
      return;
    }

    if (isNaN(userId) || parseInt(userId, 10) <= 0) {
      setError("Invalid User ID. Please enter a positive number.");
      return;
    }

    axios
      .get(`http://localhost:3001/admin/users`)
      .then((response) => {
        const user = response.data.find(
          (user) => user.user_id === parseInt(userId, 10)
        );
        if (user) {
          alert(
            `User ID: ${user.user_id}\nRole: ${user.role}\nManager ID: ${user.managerid}\nStatus: ${user.status}\nSpecialization: ${user.specialization}`
          );
          setUserId("");
        } else {
          alert("User not found.");
          setUserId("");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the user details!", error);
        alert("There was an error fetching the user details.");
      });
  };

  return (
    <div className="form-container">
      <h2>Fetch User Details</h2>
      <form id="fetchForm">
        <label htmlFor="userId">User ID:</label>
        <input
          type="number"
          id="userId"
          name="userId"
          value={userId}
          onChange={handleInputChange}
          required
        />
        <br />
        <button type="button" onClick={fetchUserDetails}>
          User Details
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default UserDetails;
