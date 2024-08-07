import React from "react";
import "../css/ProjectManagerMenu.css";


import logo1 from "../Media/1.jpg";
import logo2 from "../Media/logo2.jpg";
import logo3 from "../Media/3.png";
import logo4 from "../Media/4.jpg";

const projects = [
  {
    title: "Project 1",
    image: logo1,
    link: "/Project-menu",
  },
  {
    title: "Project 2",
    image: logo2,
    link: "#",
  },
  {
    title: "Project 3",
    image: logo3,
    link: "#",
  },
  {
    title: "Project 4",
    image: logo4,
    link: "#",
  },
];

const ProjectPage = () => {
  return (
    <div className="containers">
      <button className="top-right-button" onClick={() => window.history.back()}>
        Go Back
      </button>
      <div className="row">
        {projects.map((project, index) => (
          <div className="col-lg-3 col-md-6 col-s-12 mb-4" key={index}>
            <div className="card-menu">
              <img src={project.image} className="card-img-top" alt={project.title} />
              <div className="card2-body">
                <h5 className="card-title">
                  <b>{project.title}</b>
                </h5>
                <p className="card-text">Click on view to know all details about the project</p>
                <div className="btn-center">
                  <a href={project.link} className="btn btn-outline-primary">
                    View
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
