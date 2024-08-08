import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/AddTeamMember.css"; // Import the new CSS file

const AddTeamMember = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    team_id: "",
  });

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission status
  const [submitSuccess, setSubmitSuccess] = useState(null); // Track submission success or failure

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, teamsResponse] = await Promise.all([
          axios.get("http://localhost:3001/admin/users"),
          axios.get("http://localhost:3001/admin/teams"),
        ]);

        setUsers(usersResponse.data);
        setTeams(teamsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter users based on manager_id, role, and status
  const filteredUsers = users.filter(
    (user) =>
      user.managerid === 0 &&
      user.role === "TEAM_MEMBER" &&
      user.status === "ACTIVE"
  );

  // Display all team IDs
  const allTeams = teams.map((team) => ({
    team_id: team.team_id,
    team_name: team.team_name,
  }));

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
      // Add user to the team_member table
      await axios.post("http://localhost:3001/admin/teamMember", {
        team_id: formData.team_id,
        user_id: formData.user_id,
      });

      // Update the manager_id of the user to 1
      await axios.put(`http://localhost:3001/admin/users/${formData.user_id}`, {
        managerid: 1,
      });

      alert("Team member added and manager_id updated to 1 successfully!");
      setSubmitSuccess(true);
      setFormData({
        user_id: "",
        team_id: "",
      });
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
            {filteredUsers.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.username} (ID: {user.user_id})
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
            {allTeams.map((team) => (
              <option key={team.team_id} value={team.team_id}>
                {team.team_name} (ID: {team.team_id})
              </option>
            ))}
          </select>
          <br />

          <button type="submit" className="button-a" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Member"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeamMember;
