import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/AddTeamMember.css"; // Import the new CSS file

const RemoveTeamMember = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    team_id: "",
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/admin/teamMembers"
        );
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Error fetching team members data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateAndSubmitForm = async () => {
    if (!formData.user_id || !formData.team_id) {
      alert("Please select both a user and a team.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Remove team member
      await axios.delete("http://localhost:3001/admin/teamMember", {
        data: {
          team_id: formData.team_id,
          user_id: formData.user_id,
        },
      });

      // Update the manager_id of the user to 0
      await axios.put(`http://localhost:3001/admin/users/${formData.user_id}`, {
        managerid: 0,
      });

      alert("Team member removed and manager_id updated to 0 successfully!");
      setSubmitSuccess(true);
      setFormData({
        user_id: "",
        team_id: "",
      });

      // Refresh team members data
      const response = await axios.get(
        "http://localhost:3001/admin/teamMembers"
      );
      setTeamMembers(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitSuccess(false);
      alert("Failed to remove team member. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-team-member-container">
      <div id="createUserForm" className="form-container-a">
        <h2 className="title-a">Remove Team Member</h2>
        <form
          id="userForm"
          onSubmit={(e) => {
            e.preventDefault();
            validateAndSubmitForm();
          }}
        >
          <label htmlFor="user_id" className="label-a">
            User ID:
          </label>
          <select
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
            className="input-a"
          >
            <option value="">Select User</option>
            {teamMembers.map((member) => (
              <option key={member.user_id} value={member.user_id}>
                {member.user_id}
              </option>
            ))}
          </select>
          <br />

          <label htmlFor="team_id" className="label-a">
            Team ID:
          </label>
          <select
            id="team_id"
            name="team_id"
            value={formData.team_id}
            onChange={handleChange}
            required
            className="input-a"
          >
            <option value="">Select Team</option>
            {teamMembers.map((member) => (
              <option key={member.team_id} value={member.team_id}>
                {member.team_id}
              </option>
            ))}
          </select>
          <br />

          <button type="submit" className="button-a" disabled={isSubmitting}>
            {isSubmitting ? "Removing..." : "Remove"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RemoveTeamMember;
