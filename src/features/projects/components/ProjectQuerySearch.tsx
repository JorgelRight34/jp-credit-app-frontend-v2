import {
  EntityQuerySearch,
  QuerySearchInput,
  QuerySearchProps,
} from "@/components";
import { ProjectsQuery } from "../models/projectsQuery";

type ProjectQuerySearchProps = QuerySearchProps<ProjectsQuery>;

const fields: QuerySearchInput<ProjectsQuery>[] = [
  {
    name: "id",
    id: "id",
    type: "number",
    label: "Id",
    col: 1,
  },
  {
    name: "name",
    id: "name",
    label: "Nombre",
  },
];

const ProjectQuerySearch = ({ ...props }: ProjectQuerySearchProps) => {
  return <EntityQuerySearch fields={fields} {...props} />;
};

export default ProjectQuerySearch;
