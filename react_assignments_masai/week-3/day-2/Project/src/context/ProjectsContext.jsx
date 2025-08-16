import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";

// Create context
const ProjectsContext = createContext();

// Provider
export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const projectsRef = ref(db, "projects");
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setProjects(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

// Hook
export const useProjects = () => {
  return useContext(ProjectsContext);
};
