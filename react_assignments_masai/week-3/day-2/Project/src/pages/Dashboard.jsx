import React from "react";
import { useProjects } from "../context/ProjectsContext";

const Dashboard = () => {
  const { projects } = useProjects();

  return (
    <div>
      <h1>Dashboard</h1>
      {Object.keys(projects).length === 0 ? (
        <p>No projects found</p>
      ) : (
        Object.entries(projects).map(([id, project]) => (
          <div key={id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>
              Tasks: {project.tasks ? Object.keys(project.tasks).length : 0}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
