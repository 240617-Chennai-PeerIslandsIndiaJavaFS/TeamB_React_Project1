import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPage";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import DeactiveUser from "./components/DeactiveUser";
import AssignRole from "./components/AssignRole";
import CreateClient from "./components/CreateClient";
import CreateProject from "./components/CreateProject";
import UserDetails from "./components/UserDetails";
import UserDetailPage from "./components/UserDetailPage";
import TaskDetails from "./components/TaskDetails";
import TeamMemberPage from "./components/TeamMemberPage";
import TaskPage from "./components/TaskPage";
import Dashboard from "./components/Dashboard";
import PasswordReset from "./components/PasswordReset";
import ProjectPage from "./components/ProjectManagerMenu";
import ProjectMenu from "./components/ProjectMenu";
import ProjectDetailsCard from "./components/viewprojectclientdetails";
import UpdateTask from "./components/UpdateTask";
import AddTeamMember from "./components/AddTeamMemberToProject";
import RemoveTeamMember from "./components/RemoveTeamMemberFromProject";
import AssignTaskForm from "./components/AssignTaskToTeamMember";
import UpdateTaskStatus from "./components/UpdateTaskStatus";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route path="registration" element={<CreateUser />} />
          <Route path="update-user" element={<UpdateUser />} />
          <Route path="deactivate-user" element={<DeactiveUser />} />
          <Route path="assign-role" element={<AssignRole />} />
          <Route path="create-client" element={<CreateClient />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="user-details" element={<UserDetails />} />
          <Route path="monitor-task-details" element={<TaskDetails />} />
          <Route path="users/:id" element={<UserDetailPage />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/team-member" element={<TeamMemberPage />} />
        <Route path="/team-member/task/:taskId" element={<TaskPage />} />
        <Route
          path="/team-member/update-task-status"
          element={<UpdateTaskStatus />}
        />
        <Route path="/Project-manager-menu" element={<ProjectPage />} />
        <Route path="/Project-menu" element={<ProjectMenu />}>
          <Route
            path="viewprojectclientdetails/:projectId"
            element={<ProjectDetailsCard />}
          />
          <Route
            path="add-team-member-to-project/:projectId"
            element={<AddTeamMember />}
          />
          <Route
            path="remove-team-member-from-project/:projectId"
            element={<RemoveTeamMember />}
          />
          <Route
            path="assign-task-to-team-member/:projectId"
            element={<AssignTaskForm />}
          />
          <Route path="update-task/:projectId" element={<UpdateTask />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
