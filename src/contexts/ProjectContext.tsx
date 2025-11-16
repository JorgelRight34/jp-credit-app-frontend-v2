import { createContext, useContext, useState } from "react";
import { PROJECT_KEY } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./AuthContext";
import { Project } from "@/features/projects";
import { fetchProject } from "@/features/projects/services/projectService";

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

  const { data: project } = useQuery({
    queryKey: ["projects", projectId],
    queryFn: async () => {
      if (!projectId) {
        throw new Error("Project ID is required");
      }
      return await fetchProject(projectId);
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
