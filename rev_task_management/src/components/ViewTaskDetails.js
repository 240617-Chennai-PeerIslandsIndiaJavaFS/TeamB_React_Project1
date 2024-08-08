import React, { useEffect, useState } from "react";
import "../css/ViewTasks.css"; // Ensure you have this CSS file

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/admin/tasks`);
        const allTasks = await response.json();

        // Filter tasks for project_id 1
        const filteredTasks = allTasks.filter(
          (task) => task.project_id === 1
        );
        setTasks(filteredTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="view-tasks">
      <h2>Tasks for Project ID: 1</h2>
      <div className="task-list-v">
        {tasks.map((task) => (
          <div key={task.task_id} className="task-item-v">
            <h4>Task ID: {task.task_id}</h4>
            <p>Task Name: {task.task_name}</p>
            <p>Status: {task.status}</p>
            <p>Assigned To (User ID): {task.assigned_to}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTasks;

