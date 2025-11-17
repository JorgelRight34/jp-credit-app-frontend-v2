import ProjectDataTable from "./ProjectDataTable";
import { ProjectsQuery } from "../models/projectsQuery";
import { Project } from "../models/project";
import ProjectQuerySearch from "./ProjectQuerySearch";
import { EntitySection, EntitySectionProps } from "@/components";

interface ProjectSectionProps
  extends EntitySectionProps<Project, ProjectsQuery> {
  allowSelect?: boolean;
  toast?: boolean;
}

const ProjectSection = ({ toast, ...props }: ProjectSectionProps) => {
  return (
    <EntitySection
      Search={ProjectQuerySearch}
      DataTable={(table) => ProjectDataTable({ ...table, toast })}
      {...props}
    />
  );
};

export default ProjectSection;
