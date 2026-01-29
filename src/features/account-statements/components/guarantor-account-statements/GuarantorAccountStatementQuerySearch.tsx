import {
  EntityQuerySearch,
  QuerySearchInput,
  QuerySearchProps,
} from "@/components";
import { LoanQuery } from "@/features/loans";

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
  ...props
}: GuarantorAccountProfileQuerySearchProps) => {
  return (
    <EntityQuerySearch
      fields={fields}
      reportTitle="Estado de Cuenta"
      {...props}
    />
  );
};

export default GuarantorAccountStatementQuerySearch;
