import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../css/AdminPage.css";

const AdminPage = () => {
  return (
    <div className="admin-page-body">
      <div className="admin-page">
        <div className="sidebar">
          <div>
            <h1>Welcome, Admin!</h1>
            <p style={{ color: "#f9f9f9" }}>Choose an action:</p>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/registration">User Registration</Link>
            <Link to="/admin/update-user">Update User</Link>
            <Link to="/admin/deactivate-user">Deactivate User</Link>
            <Link to="/admin/assign-role">Assign Role</Link>
            <Link to="/admin/create-client">Create Client</Link>
            <Link to="/admin/create-project">Create Project</Link>
            <Link to="/admin/user-details">Track User Details</Link>
            <Link to="/admin/monitor-task-details">Monitor Tasks Details</Link>
          </div>
          <Link className="btn-primary" to="/login">
            Logout
          </Link>
        </div>
        <div className="content" id="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
