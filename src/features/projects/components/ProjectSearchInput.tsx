import { EntitySearchInput, EntitySearchInputProps } from "@/components";
import { projectsQueryKey } from "../lib/constants";
import { Project } from "../models/project";
import { ProjectsQuery } from "../models/projectsQuery";
import { projectsClient } from "../services/projectService";
import ProjectSection from "./ProjectSection";

type ProjectSearchInputProps = EntitySearchInputProps<Project, ProjectsQuery>;

const ProjectSearchInput = ({ ...props }: ProjectSearchInputProps) => {
  return (
    <EntitySearchInput<Project, ProjectsQuery>
      modalProps={{
        title: "Buscar Proyecto",
        height: "90dvh",
        width: "75dvw",
      }}
      accesorFn={(p) => p?.id}
      visibleValueFn={(p) => p?.name}
      cacheKey={projectsQueryKey}
      onSearch={projectsClient.getProject}
      {...props}
      render={(setValue) => (
        <ProjectSection allowSelect={false} table={{ onRowClick: setValue }} />
      )}
    ></EntitySearchInput>
  );
};

export default ProjectSearchInput;
