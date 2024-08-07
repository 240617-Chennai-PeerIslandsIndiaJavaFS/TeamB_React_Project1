import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../css/ProjectMenu.css";

const ProjectMenu = () => {
  return (
    <div className="admin-page">
      <div className="sidebar">
        <div>
          <h1>Welcome to the Project!</h1>
          <p style={{ color: "#f9f9f9" }}>Choose an action:</p>
          <Link to="viewprojectclientdetails/1">View Project Client Details</Link>
          <Link to="add-team-member-to-project/1">Add Team Member To Project</Link>
          <Link to="remove-team-member-from-project/1">Remove Team Member From Project</Link>
          <Link to="assign-task-to-team-member/1">Assign Task to Team Member</Link>
          <Link to="update-task">Update Task</Link>
          <Link to="delete-task">Delete Task</Link>
          <Link to="view-task-details">View Task Details</Link>
        </div>
        <Link className="btn-primary" to="/project-manager-menu">
          Go Back
        </Link>
      </div>
      <div className="content" id="content">
        <Outlet />
      </div>
    </div>
  );
};

export default ProjectMenu;