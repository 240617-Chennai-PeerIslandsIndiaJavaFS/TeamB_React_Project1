import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/TaskPage.css";
import { useParams, useNavigate } from "react-router-dom";

const TaskPage = () => {
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [task, setTask] = useState({});
  const [project, setProject] = useState({});
  const [client, setClient] = useState({});
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!taskId || isNaN(taskId)) {
      console.error("Invalid task ID");
      return;
    }

    const fetchTaskDetails = async () => {
      try {
        const taskResponse = await fetch(
          `http://localhost:3001/admin/task/${taskId}`
        );
        if (taskResponse.ok) {
          const taskData = await taskResponse.json();
          console.log("Task Data:", taskData); // Debugging
          setTask(taskData);

          const projectResponse = await fetch(
            `http://localhost:3001/admin/project/${taskData.project_id}`
          );
          if (projectResponse.ok) {
            const projectData = await projectResponse.json();
            console.log("Project Data:", projectData); // Debugging
            setProject(projectData);

            const clientResponse = await fetch(
              `http://localhost:3001/admin/client/${projectData.clientid}`
            );
            if (clientResponse.ok) {
              const clientData = await clientResponse.json();
              console.log("Client Data:", clientData); // Debugging
              setClient(clientData);
            } else {
              console.error("Failed to fetch client data");
            }
          } else {
            console.error("Failed to fetch project data");
          }
        } else {
          console.error("Failed to fetch task data");
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

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
        <Modal
          show={showTaskDetails}
          onHide={() => setShowTaskDetails(false)}
          size="lg"
          centered
        >
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
              <strong>Task Description:</strong> {task.description}
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
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Project ID:</strong> {project.project_id}
            </p>
            <p>
              <strong>Project Name:</strong> {project.name}
            </p>
            <p>
              <strong>Project Description:</strong> {project.desc}
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
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Client Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Client ID:</strong> {client.client_id}
            </p>
            <p>
              <strong>Client Name:</strong> {client.name}
            </p>
            <p>
              <strong>Company Name:</strong> {client.companyName}
            </p>
            <p>
              <strong>Client Email:</strong> {client.email}
            </p>
            <p>
              <strong>Client Phone:</strong> {client.phone}
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
