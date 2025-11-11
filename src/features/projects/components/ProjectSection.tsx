import ProjectDataTable from "./ProjectDataTable";
import { ProjectsQuery } from "../models/projectsQuery";
import { Project } from "../models/project";
import ProjectQuerySearch from "./ProjectQuerySearch";
import { EntitySectionProps } from "@/components/EntitySection/models/EntitySectionProps";
import EntitySection from "@/components/EntitySection/components/EntitySection";

interface ProjectSectionProps
  extends EntitySectionProps<Project, ProjectsQuery> {
  allowSelect?: boolean;
}

const ProjectSection = ({ ...props }: ProjectSectionProps) => {
  return (
    <EntitySection
      Search={ProjectQuerySearch}
      DataTable={ProjectDataTable}
      {...props}
    />
  );
};

export default ProjectSection;
