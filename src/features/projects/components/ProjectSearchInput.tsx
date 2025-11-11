import EntitySearchInput from "../../../components/EntitySearchInput/EntitySearchInput";
import { EntitySearchInputProps } from "../../../components/EntitySearchInput/entitySearchInputProps";
import { projectsQueryKey } from "../lib/constants";
import { Project } from "../models/project";
import { ProjectsQuery } from "../models/projectsQuery";
import { fetchProject } from "../services/projectService";
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
      onSearch={fetchProject}
      {...props}
      render={(setValue) => {
        return (
          <ProjectSection
            allowSelect={false}
            table={{ onRowClick: setValue }}
          />
        );
      }}
    ></EntitySearchInput>
  );
};

export default ProjectSearchInput;
