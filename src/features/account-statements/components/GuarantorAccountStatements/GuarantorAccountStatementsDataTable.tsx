import { EntityDataTableProps } from "../../../../components/DataTable/models/entityDataTableProps";
import { EntityDataTable } from "@/components/DataTable";
import { Column } from "@/components/DataTable/models/column";
import { toCurrency } from "@/utils/utils";
import { accountStatementsCacheKey } from "../../lib/constants";
import { DateLabel } from "@/components/ui";
import { Loan } from "@/features/Loans/models/loan";
import { LoanQuery } from "@/features/Loans/models/loanQuery";
import { getLoans } from "@/features/Loans/services/loanClient";
import LinkToProfile from "@/features/Profiles/components/LinkToProfile";
import { getFooterTotalAsCurrency } from "@/components/EntityForm/utils/utils";

type GuarantorAccountStatementsDataTableProps = EntityDataTableProps<
  Loan,
  LoanQuery
>;

const columns: Column<Loan>[] = [
  {
    accessorKey: "startDate",
    header: "Fecha",
    enableSorting: true,
    cell: ({ row }) => <DateLabel date={row.original.startDate} />,
  },
  {
    accessorKey: "disbursedAmount",
    header: "Documento",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.disbursedAmount),
    footer: (info) => getFooterTotalAsCurrency(info, "disbursedAmount"),
  },
  {
    accessorKey: "principalBalance",
    header: "Balance Capital",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.principalBalance),
    footer: (info) => getFooterTotalAsCurrency(info, "principalBalance"),
  },
  {
    accessorKey: "interestBalance",
    header: "Interés",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.interestBalance),
    footer: (info) => getFooterTotalAsCurrency(info, "interestBalance"),
  },
  {
    accessorKey: "clientName",
    header: "Cliente",
    enableSorting: true,
    cell: ({ row }) => (
      <LinkToProfile
        profile={row.original.clientName}
        id={row.original.clientId}
      />
    ),
  },
];

const GuarantorAccountStatementsDataTable = ({
  ...props
}: GuarantorAccountStatementsDataTableProps) => {
  return (
    <EntityDataTable
      title="Estado de Cuenta"
      cacheKey={[...accountStatementsCacheKey, "guarantor"]}
      loader={getLoans}
      columns={columns}
      {...props}
    />
  );
};

export default GuarantorAccountStatementsDataTable;
