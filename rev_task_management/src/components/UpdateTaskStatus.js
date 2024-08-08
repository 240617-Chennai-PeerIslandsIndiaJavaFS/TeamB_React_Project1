import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../css/UpdateTaskStatus.css";

const ItemTypes = {
  TASK: "task",
};

const Task = ({ task, index, moveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { index, task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="task-items"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {task.task_name}
    </div>
  );
};

const Column = ({ column, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => moveTask(item.task, column),
  });

  return (
    <Col ref={drop} className="status-column" xs={12} sm={6} md={4} lg={3}>
      <h2 className="statushead">{column}</h2>
      <div className="task-lists">
        {tasks.map((task, index) => (
          <Task
            key={task.task_id}
            task={task}
            index={index}
            moveTask={moveTask}
          />
        ))}
      </div>
    </Col>
  );
};

const UpdateTaskStatus = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/admin/tasks/${user.user_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          setError("Failed to fetch tasks");
        }
      } catch (error) {
        setError("An error occurred while fetching tasks: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user, navigate]);

  const moveTask = async (task, newStatus) => {
    const updatedTasks = tasks.map((t) =>
      t.task_id === task.task_id ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);

    try {
      await fetch(
        `http://localhost:3001/admin/updateTaskStatus/${task.task_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
    } catch (error) {
      setError(
        "An error occurred while updating task status: " + error.message
      );
    }
  };

  const columns = [
    "TO DO",
    "IN PROGRESS",
    "TESTING",
    "IN REVIEW",
    "BLOCKED",
    "MERGED",
    "CLOSED",
  ];

  if (!user) return null;

  return (
    <Container className="update-task-status all">
      <Row className="top-row">
        <Col>
          <h1>Update Task Status</h1>
          <p>Drag and drop tasks to update their status.</p>
        </Col>
      </Row>
      <Row className="status-row">
        {loading ? (
          <Spinner animation="border" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <DndProvider backend={HTML5Backend}>
            {columns.map((column) => (
              <Column
                key={column}
                column={column}
                tasks={tasks.filter((task) => task.status === column)}
                moveTask={moveTask}
              />
            ))}
          </DndProvider>
        )}
      </Row>
    </Container>
  );
};

export default UpdateTaskStatus;
