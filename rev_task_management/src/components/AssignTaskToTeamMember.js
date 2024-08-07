import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../css/AssignTaskForm.css'; // Import the CSS file

const AssignTaskForm = () => {
  const [formData, setFormData] = useState({ name: '', role: '', email: '', date: '' });
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    // Fetch team members when the component mounts
    axios.get('http://localhost:3001/admin/teamMembers')
      .then(response => {
        setTeamMembers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the team members!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateAndSubmitForm = () => {
    const { name, role, email, date } = formData;

    // Add your validation logic here
    if (!name || !role || !email || !date) {
      alert("Please fill in all fields");
      return;
    }

    // Submit the form data to the server
    axios.post('http://localhost:3001/admin/assignTask', {
      taskName: name,
      assignedTo: parseInt(role, 10),
      taskDescription: email,
      taskDeadline: date,
    })
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        console.error('There was an error assigning the task!', error);
      });
  };

  return (
    <div className="assign-task-form-container">
      <div className="form-container-c">
        <h2 className="form-title-c">Assign Task To Team Member</h2>
        <form id="userForm">
          <div className="mb-3 row">
            <label htmlFor="name" className="col-form-label form-label-c">Task Name:</label>
            <div className="col-sm-12">
              <input
                type="text"
                id="name"
                name="name"
                className="form-control form-input-c"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="role" className="col-form-label-c form-label-c">Assign to:</label>
            <div className="col-sm-12">
              <select
                id="role"
                name="role"
                className="form-control-c form-input-c"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Team Member</option>
                {teamMembers.map(member => (
                  <option key={member.user_id} value={member.user_id}>{member.username}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-form-label-c form-label-c">Task Description:</label>
            <div className="col-sm-12">
              <input
                type="text"
                id="email"
                name="email"
                className="form-control form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="date" className="col-form-label-c form-label-c">Task Deadline:</label>
            <div className="col-sm-12">
              <input
                type="date"
                id="date"
                name="date"
                className="form-control form-input"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary form-button-c"
            onClick={validateAndSubmitForm}
          >
            Assign Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTaskForm;
