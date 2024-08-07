import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/RemoveTeamMember.css'; 

const RemoveTeamMember = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateAndSubmitForm = async () => {
    // Add your validation logic here
    if (!formData.name || !formData.role || !formData.email) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      // Submit form data to your server
      const response = await axios.post('http://localhost:3001/admin/removeTeamMember', formData); // Replace with your API endpoint
      console.log('Form submitted:', response.data);
      alert('Team member removed successfully!');
    } catch (error) {
      console.error('Error removing team member:', error);
      alert('Failed to remove team member.');
    }
  };

  return (
    <div className="removeTeamMember-body">
      <div id="createUserForm" className="formContainer-b">
        <h2 className="title-b">Remove Team Member</h2>
        <form id="userForm">
          <label htmlFor="name" className="label-b">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-b"
          /><br />

          <label htmlFor="role" className="label-b">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="input-b"
          >
            <option value="">Select Role</option>
            <option value="TEAM_MEMBER">TEAM_MEMBER</option>
          </select><br />

          <label htmlFor="email" className="label-b">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-b"
          /><br />

          <button
            type="button"
            onClick={validateAndSubmitForm}
            className="button-b"
          >
            Remove User
          </button>
        </form>
      </div>
    </div>
  );
};

export default RemoveTeamMember;
