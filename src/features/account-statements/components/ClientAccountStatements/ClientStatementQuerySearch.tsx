import { EntityQuerySearch } from "@/components/EntityQuerySearch";
import { TransactionsQuery } from "@/features/Transactions/models/transactionsQuery";
import { QuerySearchInput, QuerySearchProps } from "@/models";

type ClientAccountProfileQuerySearchProps = QuerySearchProps<TransactionsQuery>;

const fields: QuerySearchInput<TransactionsQuery>[] = [
  {
    name: "loanId",
    type: "profile",
    label: "Préstamo",

    searchOnChange: true,
  },
];

const ClientAccountStatementQuerySearch = ({
  defaultValues,
  ...props
}: ClientAccountProfileQuerySearchProps) => {
  return (
    <EntityQuerySearch
      defaultValues={defaultValues}
      fields={fields}
      reportTitle={`Estado de Cuenta`}
      {...props}
    />
  );
};

export default ClientAccountStatementQuerySearch;
