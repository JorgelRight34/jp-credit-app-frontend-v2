"use client";

import { createContext, useContext, useState } from "react";
import { PROJECT_KEY } from "../utils/constants";
import { useAuth } from "./AuthContext";
import { Project, projectsClient, projectsQueryKey } from "@/features/projects";
import { useData } from "@/hooks/useData";

type ProjectContextType = {
  project?: Project;
  projectId?: number;
  chooseProject: (project: Project) => void;
  deselectProject: (project: Project) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const ProjectProvider = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuth();

  const [projectId, setProjectId] = useState<number | undefined>(
    Number(localStorage.getItem(PROJECT_KEY)) || undefined,
  );

  const { data: project } = useData({
    key: [...projectsQueryKey, projectId],
    getData: async () => {
      if (!projectId) {
        throw new Error("Project ID is required");
      }
      return await projectsClient.getProject(projectId);
    },
    enabled: !!user && projectId !== undefined,
  });

  const chooseProject = (project: Project) => {
    localStorage.setItem(PROJECT_KEY, project.id.toString());
    setProjectId(project.id);
  };

  const deselectProject = (project: Project) => {
    if (project.id !== projectId)
      throw Error("Try to deselect a not selected project");
    localStorage.removeItem(PROJECT_KEY);
    setProjectId(undefined);
  };

  return (
    <ProjectContext.Provider
      value={{
        project: projectId ? project : undefined,
        projectId,
        chooseProject,
        deselectProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useCurrentProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useCurrentProject must be inside ProjectProvider");
  }
  return context;
};

export default ProjectProvider;
