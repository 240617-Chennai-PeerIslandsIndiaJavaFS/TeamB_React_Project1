import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ViewProjectClientDetails.css"; // Import the new CSS file

const ProjectDetailsCard = () => {
  const { projectId } = useParams();
  const [client, setClient] = useState(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        const projectResponse = await axios.get(
          `http://localhost:3001/admin/project/${projectId}`
        );
        const { clientid, name } = projectResponse.data;
        setProject({ name });

        const clientResponse = await axios.get(
          `http://localhost:3001/admin/client/${clientid}`
        );
        setClient(clientResponse.data);
      } catch (err) {
        console.error("Error fetching client data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [projectId]);

  if (loading) {
    return <div className="container-v">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container-v">
        <div className="alert alert-danger">Error: {error}</div>
      </div>
    );
  }

  if (!client || !project) {
    return (
      <div className="container-v">
        <div className="alert alert-warning">No client data available</div>
      </div>
    );
  }

  return (
    <div className="container-v">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="cards-v">
            <div className="cards-body-v">
              <h5 className="cards-title-v">Project Name: {project.name}</h5>
              <p className="cards-text-v">
                <strong>Name:</strong> {client.name}
              </p>
              <p className="cards-text-v">
                <strong>Email:</strong> {client.email}
              </p>
              <p className="cards-text-v">
                <strong>Phone No:</strong> {client.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsCard;