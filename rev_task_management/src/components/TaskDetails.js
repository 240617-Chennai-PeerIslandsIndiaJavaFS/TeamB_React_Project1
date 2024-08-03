import React from "react";
import TaskPieChart from "./TaskPieChart";

const TaskDetails = () => {
  return (
    <div className="form-container">
      <h2>Tasks Status Overview</h2>
      <TaskPieChart />
    </div>
  );
};

export default TaskDetails;
