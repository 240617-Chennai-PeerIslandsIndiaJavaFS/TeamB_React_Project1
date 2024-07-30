import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Registration.css";

const CreateProject = () => {
  const initialFormData = {
    clientid: "",
    name: "",
    desc: "",
    managerid: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/projects")
      .then((response) => {
        const nextProjectId = response.data.length + 1;
        console.log("Next Project ID:", nextProjectId);
        setProjectCount(response.data.length);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the list of projects!",
          error
        );
      });
  }, [projectCount]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProject = (e) => {
    e.preventDefault();

    const { clientid, name, desc, managerid } = formData;

    console.log("Form data before validation:", formData);

    if (!clientid || !name || !desc || !managerid) {
      alert("Please fill in all the required fields.");
      return;
    }

    axios
      .post("http://localhost:3001/admin/createProject", formData)
      .then((response) => {
        console.log("Form data submitted:", response.data);
        alert("Project created successfully!");
        setProjectCount(projectCount + 1);
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("There was an error creating the project!", error);
        alert("There was an error creating the project!");
      });
  };

  return (
    <div className="form-container">
      <h2>Create Project</h2>
      <form id="projectForm">
        <label htmlFor="clientid">Client ID:</label>
        <input
          type="text"
          id="clientid"
          name="clientid"
          value={formData.clientid}
          onChange={handleChange}
          inputMode="numeric"
          pattern="\d*"
          required
        />
        <br />

        <label htmlFor="name">Project Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="desc">Project Description:</label>
        <input
          type="text"
          id="desc"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="managerid">Manager ID:</label>
        <input
          type="number"
          id="managerid"
          name="managerid"
          value={formData.managerid}
          onChange={handleChange}
          required
        />
        <br />

        <button type="button" onClick={handleProject}>
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
