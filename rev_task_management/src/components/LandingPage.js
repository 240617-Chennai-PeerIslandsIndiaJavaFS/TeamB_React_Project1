import React from "react";
import { Link } from "react-router-dom";
import "../css/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="container LandingBody">
      <div className="left-side">
        <img src="/MEDIA/akshay logo.png" alt="Logo" className="logo" />
        <p className="description">
          WHERE 'EFFICIENCY' <br />
          MEETS
          <br />
          'INGENUITY'
        </p>
      </div>
      <div className="right-side">
        <h1 className="product-name">SYNERGIZE</h1>
        <br />
        <br />
        <Link to="/login">
          <button
            type="button"
            className="btn btn-primary btn-lg custom-button btn1"
          >
            GET STARTED!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
