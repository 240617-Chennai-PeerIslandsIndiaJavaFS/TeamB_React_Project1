import React, { useState } from "react";
import axios from "axios";
import "../css/Registration.css";

const TaskDetails = () => {
  const [taskId, setTaskId] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setTaskId(e.target.value);
  };

  const fetchTaskDetails = (e) => {
    e.preventDefault();

    setError("");

    if (!taskId) {
      setError("Please enter a Task ID.");
      return;
    }

    if (isNaN(taskId) || parseInt(taskId, 10) <= 0) {
      setError("Invalid Task ID. Please enter a positive number.");
      return;
    }

    axios
      .get(`http://localhost:3001/admin/tasks`)
      .then((response) => {
        const task = response.data.find(
          (task) => task.task_id === parseInt(taskId, 10)
        );
        if (task) {
          alert(
            `Task ID: ${task.task_id}\nTask Name: ${task.task_name}\nProject ID: ${task.project_id}\nDescription: ${task.description}\nAssigned To: ${task.assigned_to}\nStatus: ${task.status}`
          );
          setTaskId("");
        } else {
          alert("Task not found.");
          setTaskId("");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the task details!", error);
        alert("There was an error fetching the task details.");
      });
  };

  return (
    <div className="form-container">
      <h2>Fetch Task Details</h2>
      <form id="fetchForm">
        <label htmlFor="taskId">Task ID:</label>
        <input
          type="number"
          id="taskId"
          name="taskId"
          value={taskId}
          onChange={handleInputChange}
          required
        />
        <br />
        <button type="button" onClick={fetchTaskDetails}>
          Task Details
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default TaskDetails;
