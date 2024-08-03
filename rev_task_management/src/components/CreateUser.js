import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Registration.css";

const CreateUser = () => {
  const initialFormData = {
    user_id: "",
    name: "",
    role: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/users")
      .then((response) => {
        const nextUserId = response.data.length + 1;
        console.log("Next User ID:", nextUserId);
        setFormData((prevData) => ({
          ...prevData,
          user_id: nextUserId,
        }));
        setUserCount(response.data.length);
      })
      .catch((error) => {
        console.error("There was an error fetching the list of users!", error);
      });
  }, [userCount]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateAndSubmitForm = () => {
    const { user_id, name, role, email, password, phone, specialization } =
      formData;

    console.log("Form data before validation:", formData);

    if (!name || !role || !email || !password || !phone || !specialization) {
      alert("Please fill in all the required fields.");
      return;
    }

    axios
      .post("http://localhost:3001/admin/registration", formData)
      .then((response) => {
        console.log("Form data submitted:", response.data);
        alert("User created successfully!");
        setUserCount(userCount + 1);
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("There was an error creating the user!", error);
        alert("There was an error creating the user!");
      });
  };

  return (
    <div className="form-container">
      <h2>Create User</h2>
      <form id="userForm">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
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

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="specialization">Specialization:</label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        />
        <br />

        <button
          type="button"
          className="common"
          onClick={validateAndSubmitForm}
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
