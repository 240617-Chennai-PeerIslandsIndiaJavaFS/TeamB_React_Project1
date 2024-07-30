import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Registration.css";

const CreateClient = () => {
  const initialFormData = {
    client_id: "",
    name: "",
    companyName: "",
    email: "",
    phone: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [clientCount, setClientCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/clients")
      .then((response) => {
        const nextClientId = response.data.length + 1;
        console.log("Next Client ID:", nextClientId);
        setFormData((prevData) => ({
          ...prevData,
          client_id: nextClientId,
        }));
        setClientCount(response.data.length);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the list of clients!",
          error
        );
      });
  }, [clientCount]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClient = (e) => {
    e.preventDefault();

    const { client_id, name, companyName, email, phone } = formData;

    console.log("Form data before validation:", formData);

    if (!client_id || !name || !companyName || !email || !phone) {
      alert("Please fill in all the required fields.");
      return;
    }

    axios
      .post("http://localhost:3001/admin/createClient", formData)
      .then((response) => {
        console.log("Form data submitted:", response.data);
        alert("Client created successfully!");
        setClientCount(clientCount + 1);
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("There was an error creating the client!", error);
        alert("There was an error creating the client!");
      });
  };

  return (
    <div className="form-container">
      <h2>Create Client</h2>
      <form id="clientForm">
        <label htmlFor="name">Client Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="companyName">Client Company:</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="email">Client Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="+917643569867"
        />
        <br />

        <button type="button" onClick={handleClient}>
          Create Client
        </button>
      </form>
    </div>
  );
};

export default CreateClient;
