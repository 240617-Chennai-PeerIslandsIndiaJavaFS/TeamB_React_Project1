import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/AddTeamMember.css"; // Import the new CSS file

const AddTeamMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    specialization: "",
  });

  const [roles, setRoles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission status
  const [submitSuccess, setSubmitSuccess] = useState(null); // Track submission success or failure

  useEffect(() => {
    // Fetch roles from the server when the component mounts
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:3001/admin/roles"); // Replace with your API endpoint
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateAndSubmitForm = async () => {
    // Add your validation logic here
    if (!formData.name || !formData.role || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    // Set submitting status to true
    setIsSubmitting(true);

    try {
      // Send POST request to the server
      const response = await axios.post("http://localhost:3001/admin/addTeamMember", formData);

      // Handle success response
      if (response.status === 200) {
        alert("Team member added successfully!");
        setSubmitSuccess(true);
        setFormData({
          name: "",
          role: "",
          email: "",
          phone: "",
          specialization: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitSuccess(false);
      alert("Failed to add team member. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-team-member-container">
      <div id="createUserForm" className="form-container-a">
        <h2 className="title-a">Add Team Member</h2>
        <form id="userForm">
          <label htmlFor="name" className="label-a">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-a"
          />
          <br />

          <label htmlFor="role" className="label-a">
            Role:
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="input-a"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          <br />

          <label htmlFor="email" className="label-a">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-a"
          />
          <br />

          <label htmlFor="specialization" className="label-a">
            Specialization:
          </label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="input-a"
          />
          <br />

          <button
            type="button"
            onClick={validateAndSubmitForm}
            className="button-a"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Member"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeamMember;
