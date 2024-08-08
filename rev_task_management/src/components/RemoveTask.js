import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/RemoveTask.css"; // Import the CSS file for styling

const RemoveTask = () => {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/admin/tasks");
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setErrorMessage("Failed to fetch tasks.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Function to display alert and remove the task card
  const handleRemoveTask = (taskId) => {
    alert(`Task with ID ${taskId} would be removed.`);

    // Remove the task card from the state
    setTasks(tasks.filter((task) => task.task_id !== taskId));
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="remove-task-container">
      <h2>Remove Task</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="task-cards">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.task_id} className="task-card">
              <h4>Task ID: {task.task_id}</h4>
              <p>Task Name: {task.task_name}</p>
              <button
                className="remove-button"
                onClick={() => handleRemoveTask(task.task_id)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default RemoveTask;
