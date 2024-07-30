import React, { useState } from "react";
import axios from "axios";
import "../css/Registration.css";

const AssignRole = () => {
  const [formData, setFormData] = useState({
    userid: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { userid, role } = formData;

    if (!userid || !role) {
      alert("Please fill in all the required fields.");
      return;
    }

    axios
      .put(`http://localhost:3001/admin/assignRole/${userid}`, {
        role,
      })
      .then((response) => {
        console.log("Role assigned:", response.data);
        alert("Role assigned successfully!");
        setFormData({
          userid: "",
          role: "",
        });
      })
      .catch((error) => {
        console.error("There was an error assigning the role!", error);
        alert("There was an error assigning the role!");
      });
  };

  return (
    <div id="createUserForm" className="form-container">
      <h2>Assign Role</h2>
      <form id="userForm" onSubmit={handleSubmit}>
        <label htmlFor="userid">UserID:</label>
        <input
          type="number"
          id="userid"
          name="userid"
          value={formData.userid}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="ADMIN">ADMIN</option>
          <option value="PROJECT_MANAGER">PROJECT_MANAGER</option>
          <option value="TEAM_MEMBER">TEAM_MEMBER</option>
        </select>
        <br />

        <button type="submit">Assign Role</button>
      </form>
    </div>
  );
};

export default AssignRole;
