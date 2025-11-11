import { LoanQuery } from "@/features/Loans/models/loanQuery";
import { EntityQuerySearch } from "@/components/EntityQuerySearch";
import { QuerySearchInput, QuerySearchProps } from "@/models";

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
  defaultValues,
  ...props
}: GeneralAccountProfileQuerySearchProps) => {
  return (
    <EntityQuerySearch
      defaultValues={defaultValues}
      fields={fields}
      reportTitle={`Estado de Cuenta`}
      {...props}
    />
  );
};

export default GeneralAccountStatementQuerySearch;
