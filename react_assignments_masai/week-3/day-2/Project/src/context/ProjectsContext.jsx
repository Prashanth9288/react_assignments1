import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { openStream } from '../lib/stream';
import * as api from '../api/projects';

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const { user } = useAuth();
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProjects({});
      return;
    }
    const close = openStream(`/users/${user.uid}/projects`, (data) => {
      setProjects(data || {});
      setLoading(false);
    });
    return close;
  }, [user]);

  return (
    <ProjectsContext.Provider value={{ projects, loading, ...api, uid: user?.uid }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectsContext);
}
