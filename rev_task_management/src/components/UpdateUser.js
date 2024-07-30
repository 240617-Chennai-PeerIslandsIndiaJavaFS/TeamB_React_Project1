import React, { useState } from "react";
import axios from "axios";
import "../css/Registration.css";

const UpdateUser = () => {
  const initialFormData = {
    user_id: "",
    role: "",
    managerid: "",
    status: "",
    specialization: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { user_id, role, managerid, status } = formData;

    if (!user_id || !role || !managerid || !status) {
      alert("Please fill in all the required fields.");
      return;
    }

    axios
      .put(`http://localhost:3001/admin/updateUser/${user_id}`, {
        ...formData,
        user_id: parseInt(user_id, 10),
        managerid: parseInt(managerid, 10),
      })
      .then((response) => {
        console.log("User updated:", response.data);
        alert("User updated successfully!");
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("There was an error updating the user!", error);
        alert("There was an error updating the user!");
      });
  };

  return (
    <div id="createUserForm" className="form-container">
      <h2>Update User</h2>
      <form id="userForm" onSubmit={handleSubmit}>
        <label htmlFor="user_id">UserID:</label>
        <input
          type="number"
          id="user_id"
          name="user_id"
          value={formData.user_id}
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

        <label htmlFor="managerid">ManagerID:</label>
        <input
          type="number"
          id="managerid"
          name="managerid"
          value={formData.managerid}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
        <br />

        <label htmlFor="specialization">Specialization:</label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
