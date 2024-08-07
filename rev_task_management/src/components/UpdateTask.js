import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/UpdateTask.css"; // Ensure you have this CSS file

const UpdateTask = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/admin/tasks`);
        const allTasks = await response.json();

        const filteredTasks = allTasks.filter(
          (task) => task.project_id === parseInt(projectId)
        );
        setTasks(filteredTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3001/admin/users`);
        const allUsers = await response.json();
        setUsers(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchTasks();
    fetchUsers();
  }, [projectId]);

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setStatus(task.status);
    setAssignedTo(task.assigned_to);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleAssignedToChange = (e) => {
    setAssignedTo(parseInt(e.target.value, 10));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Check if assignedTo user ID exists in users list
    const userExists = users.some((user) => user.user_id === assignedTo);
    if (!userExists) {
      setErrorMessage("Assigned User ID does not exist.");
      return;
    }

    if (selectedTask) {
      const updatedTask = {
        ...selectedTask,
        status,
        assigned_to: assignedTo,
      };

      try {
        const response = await fetch(
          `http://localhost:3001/admin/tasks/${selectedTask.task_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
          }
        );

        if (response.ok) {
          alert("Task updated successfully!");
          // Optionally, update the tasks state to reflect the changes locally
          setTasks(
            tasks.map((task) =>
              task.task_id === selectedTask.task_id ? updatedTask : task
            )
          );
          setSelectedTask(null);
        } else {
          const errorData = await response.json();
          console.error("Failed to update task:", errorData);
          alert(
            "Failed to update the task. " +
              (errorData.message || "Unknown error")
          );
        }
      } catch (error) {
        console.error("Error updating task:", error);
        alert("An error occurred while updating the task.");
      }
    }
  };

  return (
    <div className="update-task">
      <h2>Tasks for Project ID: {projectId}</h2>
      <div className="task-cards">
        {tasks.map((task) => (
          <div
            key={task.task_id}
            className="task-card"
            onClick={() => handleCardClick(task)}
          >
            <h4>Task ID: {task.task_id}</h4>
            <p>Task Name: {task.task_name}</p>
          </div>
        ))}
      </div>

      {selectedTask && (
        <div className="task-form-container">
          <div className="task-form">
            <h3>Update Task ID: {selectedTask.task_id}</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Status:</label>
                <select value={status} onChange={handleStatusChange}>
                  <option value="NOT_STARTED">Not Started</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="IN_REVIEW">In Review</option>
                  <option value="TESTING">Testing</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="BLOCKED">Blocked</option>
                </select>
              </div>
              <div>
                <label>Assigned To (User ID):</label>
                <input
                  type="number"
                  value={assignedTo}
                  onChange={handleAssignedToChange}
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit">Update Task</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTask;
