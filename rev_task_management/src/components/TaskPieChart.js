import React, { useEffect, useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const TaskPieChart = () => {
  const chartRef = useRef(null);
  const [taskStatusCounts, setTaskStatusCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/tasks")
      .then((response) => {
        const tasks = response.data;
        const statusCounts = {};

        tasks.forEach((task) => {
          if (!statusCounts[task.status]) {
            statusCounts[task.status] = 0;
          }
          statusCounts[task.status]++;
        });

        setTaskStatusCounts(statusCounts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (Object.keys(taskStatusCounts).length === 0) {
    return <p>No tasks available</p>;
  }

  const data = {
    labels: Object.keys(taskStatusCounts),
    datasets: [
      {
        data: Object.values(taskStatusCounts),
        backgroundColor: [
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF6384",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0
          );
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          return percentage;
        },
        color: "#fff",
        font: {
          weight: "bold",
        },
      },
      legend: {
        display: true,
        position: "right",
      },
    },
  };

  return (
    <div>
      <Pie data={data} options={options} ref={chartRef} />
    </div>
  );
};

export default TaskPieChart;
