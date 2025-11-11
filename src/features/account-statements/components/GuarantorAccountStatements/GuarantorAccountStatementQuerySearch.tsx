import { LoanQuery } from "@/features/Loans/models/loanQuery";
import { EntityQuerySearch } from "@/components/EntityQuerySearch";
import { QuerySearchInput, QuerySearchProps } from "@/models";

type GuarantorAccountProfileQuerySearchProps = QuerySearchProps<LoanQuery>;

const fields: QuerySearchInput<LoanQuery>[] = [
  {
    name: "guarantorId",
    type: "guarantor",
    label: "Garante",
    searchOnChange: true,
  },
];

const GuarantorAccountStatementQuerySearch = ({
  defaultValues,
  ...props
}: GuarantorAccountProfileQuerySearchProps) => {
  return (
    <EntityQuerySearch
      defaultValues={defaultValues}
      fields={fields}
      reportTitle={`Estado de Cuenta`}
      {...props}
    />
  );
};

export default GuarantorAccountStatementQuerySearch;
