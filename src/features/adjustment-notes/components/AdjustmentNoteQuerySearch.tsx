import { EntityQuerySearch } from "@/components/EntityQuerySearch";
import { QuerySearchInput, QuerySearchProps } from "@/models";
import { AdjustmentNoteQuery } from "../models/adjusment-note-query";
import { dateRangeFormInterceptor } from "@/components/EntityForm/utils/interceptors";

type AdjusmentNoteQuerySearchProps = QuerySearchProps<AdjustmentNoteQuery>;

const fields: QuerySearchInput<AdjustmentNoteQuery>[] = [
  { id: "id", name: "id", label: "Id", type: "number" },
  { id: "amount", name: "amount", label: "Monto", type: "currency" },
  { id: "date", name: "date", label: "Fecha", type: "date-range" },
  { id: "loanId", name: "loanId", label: "Préstamo", type: "loan" },
];

const AdjusmentNoteQuerySearch = ({
  ...props
}: AdjusmentNoteQuerySearchProps) => {
  return <EntityQuerySearch fields={fields} {...props} interceptors={[dateRangeFormInterceptor()]} />;
};

export default AdjusmentNoteQuerySearch;
