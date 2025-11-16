import {
  EntityQuerySearch,
  QuerySearchInput,
  QuerySearchProps,
} from "@/components";
import { LoanQuery } from "@/features/loans";

type GeneralAccountProfileQuerySearchProps = QuerySearchProps<LoanQuery>;

const fields: QuerySearchInput<LoanQuery>[] = [
  {
    name: "profileId",
    type: "profile",
    label: "Pérfil",
    searchOnChange: true,
  },
];

const GeneralAccountStatementQuerySearch = ({
  ...props
}: GeneralAccountProfileQuerySearchProps) => {
  return (
    <EntityQuerySearch
      fields={fields}
      reportTitle="Estado de Cuenta"
      {...props}
    />
  );
};

export default GeneralAccountStatementQuerySearch;
