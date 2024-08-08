import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import "../css/TeamMemberPage.css";

const TeamMemberPage = () => {
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

  const handleTaskClick = (taskId) => {
    navigate(`/team-member/task/${taskId}`, { state: { user } });
  };

  const handleUpdateStatusClick = () => {
    navigate(`/team-member/update-task-status`, { state: { user } });
  };

  if (!user) return null;

  return (
    <Container className="tm-login">
      <Row className="mb-5">
        <Col className="welcome">
          <h1>Welcome, {user.username}!</h1>
          <p>
            Here are your tasks. Click on a task to view further options or
            click the button to update the task status.
          </p>
        </Col>
      </Row>
      <Row className="mb-4 tasks-detail">
        <Col>
          <h2 id="head">Your Tasks:</h2>
        </Col>
        <Col>
          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <ListGroup>
              {tasks.map((task) => (
                <ListGroup.Item
                  key={task.task_id}
                  action
                  onClick={() => handleTaskClick(task.task_id)}
                  className="task-item"
                >
                  {task.task_name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="primary"
            onClick={handleUpdateStatusClick}
            className="full-width-button"
          >
            Update Task Status
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default TeamMemberPage;
