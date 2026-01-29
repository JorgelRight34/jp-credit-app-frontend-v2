import {
  EntityQuerySearch,
  QuerySearchInput,
  QuerySearchProps,
} from "@/components";
import { ReportQuery } from "../models/reportQuery";

type ReportsQuerySearchProps = QuerySearchProps<ReportQuery>;

const fields: QuerySearchInput<ReportQuery>[] = [
  {
    id: "title",
    name: "title",
    label: "Título",
  },
  {
    id: "name",
    name: "name",
    label: "Archivo",
  },
  {
    id: "type",
    name: "type",
    type: "select",
    label: "Extensión",
    options: [["docx", "Word", "csv", "CSV", "pdf", "PDF"]],
  },
];

const ReportsQuerySearch = ({ ...props }: ReportsQuerySearchProps) => {
  return <EntityQuerySearch fields={fields} {...props} />;
};

export default ReportsQuerySearch;
