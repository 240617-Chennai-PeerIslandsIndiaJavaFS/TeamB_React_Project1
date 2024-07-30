import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
// import PasswordReset from "./components/PasswordReset";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminPage from "./components/AdminPage";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import DeactiveUser from "./components/DeactiveUser";
import AssignRole from "./components/AssignRole";
import CreateClient from "./components/CreateClient";
import CreateProject from "./components/CreateProject";
import UserDetails from "./components/UserDetails";
import TaskDetails from "./components/TaskDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/password-reset" element={<PasswordReset />} /> */}
        <Route path="/admin" element={<AdminPage />}>
          <Route path="registration" element={<CreateUser />} />
          <Route path="update-user" element={<UpdateUser />} />
          <Route path="deactivate-user" element={<DeactiveUser />} />
          <Route path="assign-role" element={<AssignRole />} />
          <Route path="create-client" element={<CreateClient />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="user-details" element={<UserDetails />} />
          <Route path="monitor-task-details" element={<TaskDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
