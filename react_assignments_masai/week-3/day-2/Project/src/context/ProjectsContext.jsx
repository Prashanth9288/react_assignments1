import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { ref, onValue, push, remove, set, update } from "firebase/database";

const ProjectsContext = createContext(null);

export const useProjects = () => useContext(ProjectsContext);

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const projectsRef = ref(db, "projects");
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedProjects = data
        ? Object.entries(data).map(([id, project]) => ({ id, ...project }))
        : [];
      setProjects(loadedProjects);
    });

    return () => unsubscribe();
  }, []);

  const addProject = (project) => {
    const projectsRef = ref(db, "projects");
    push(projectsRef, { ...project, createdAt: Date.now() });
  };

  const deleteProject = (id) => remove(ref(db, `projects/${id}`));

  const updateProject = (id, updatedData) =>
    update(ref(db, `projects/${id}`), updatedData);

  return (
    <ProjectsContext.Provider value={{ projects, addProject, deleteProject, updateProject }}>
      {children}
    </ProjectsContext.Provider>
  );
}
