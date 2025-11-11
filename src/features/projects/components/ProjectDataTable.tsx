import EntityDataTable from "../../../components/DataTable/components/EntityDataTable";
import { EntityDataTableProps } from "../../../components/DataTable/models/entityDataTableProps";
import useProjectDataTable from "../hooks/useProjectDataTable";
import { projectsQueryKey } from "../lib/constants";
import { Project } from "../models/project";
import { ProjectsQuery } from "../models/projectsQuery";
import { getProjects } from "../services/projectService";

interface ProjectDataTableProps
  extends EntityDataTableProps<Project, ProjectsQuery> {
  allowSelect?: boolean;
  toast?: boolean;
}

const ProjectDataTable = ({
  allowSelect = true,
  toast,
  ...props
}: ProjectDataTableProps) => {
  const { columns, onRowClick } = useProjectDataTable({ toast, allowSelect });

  return (
    <EntityDataTable<Project, ProjectsQuery>
      title="proyecto"
      columns={columns}
      loader={getProjects}
      cacheKey={projectsQueryKey}
      validateProject={false}
      onRowClick={onRowClick}
      {...props}
    />
  );
};

export default ProjectDataTable;
