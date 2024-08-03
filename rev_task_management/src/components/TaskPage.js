import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/TaskPage.css";

const TaskPage = () => {
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [task, setTask] = useState({});
  const [project, setProject] = useState({});
  const [client, setClient] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = parseInt(urlParams.get("task_id"), 10);

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      let foundTask;
      user.projects.forEach((project) => {
        project.tasks.forEach((t) => {
          if (t.task_id === taskId) {
            foundTask = t;
          }
        });
      });

      if (foundTask) {
        setTask(foundTask);
      }

      if (user.projects.length > 0) {
        setProject(user.projects[0]);
        setClient(user.projects[0]);
      }
    }
  }, []);

  return (
    <div className="taskpage">
      <Container className="container">
        <Row className="row">
          <Col lg={4} md={6} sm={12} className="col">
            <Card style={{ width: "22rem" }}>
              <Card.Img variant="top" src="/MEDIA/task_details.jpeg" />
              <Card.Body>
                <Card.Title>Task Details</Card.Title>
                <Card.Text>
                  Explore detailed task profiles, including essential
                  descriptions, status updates, and additional relevant
                  information, to stay informed and effectively manage your
                  tasks.
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => setShowTaskDetails(true)}
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={12} className="col">
            <Card style={{ width: "22rem" }}>
              <Card.Img variant="top" src="/MEDIA/project_details.jpg" />
              <Card.Body>
                <Card.Title>Project Details</Card.Title>
                <Card.Text>
                  Explore detailed project profiles, including essential
                  descriptions, milestones, and additional information.
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => setShowProjectDetails(true)}
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={12} className="col">
            <Card style={{ width: "22rem" }}>
              <Card.Img variant="top" src="/MEDIA/client_details.jpg" />
              <Card.Body>
                <Card.Title>Client Details</Card.Title>
                <Card.Text>
                  Explore detailed client profiles, including essential contact
                  information and more.
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => setShowClientDetails(true)}
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Task Details Modal */}
        <Modal show={showTaskDetails} onHide={() => setShowTaskDetails(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Task Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Task ID:</strong> {task.task_id}
            </p>
            <p>
              <strong>Task Name:</strong> {task.task_name}
            </p>
            <p>
              <strong>Task Description:</strong> {task.task_description}
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowTaskDetails(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Project Details Modal */}
        <Modal
          show={showProjectDetails}
          onHide={() => setShowProjectDetails(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Project ID:</strong> {project.project_id}
            </p>
            <p>
              <strong>Project Name:</strong> {project.project_name}
            </p>
            <p>
              <strong>Project Description:</strong>{" "}
              {project.project_description}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowProjectDetails(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Client Details Modal */}
        <Modal
          show={showClientDetails}
          onHide={() => setShowClientDetails(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Client Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Client Name:</strong> {client.client}
            </p>
            <p>
              <strong>Company Name:</strong> {client.client}
            </p>

            <p>
              <strong>Client Email:</strong> {client.client_email}
            </p>
            <p>
              <strong>Client Phone:</strong> {client.client_contact_number}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowClientDetails(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default TaskPage;
