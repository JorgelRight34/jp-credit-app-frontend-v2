import { QuerySearchProps } from "../../../components/EntityQuerySearch/models/querySearchProps";
import { ProjectsQuery } from "../models/projectsQuery";
import { QuerySearchInput } from "../../../components/EntityQuerySearch/models/querySearchInput";
import EntityQuerySearch from "@/components/EntityQuerySearch/components/EntityQuerySearch";

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

const ProjectQuerySearch = ({
  defaultValues,
  onSubmit,
}: ProjectQuerySearchProps) => {
  return (
    <EntityQuerySearch<ProjectsQuery>
      fields={fields}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    />
  );
};

export default ProjectQuerySearch;
