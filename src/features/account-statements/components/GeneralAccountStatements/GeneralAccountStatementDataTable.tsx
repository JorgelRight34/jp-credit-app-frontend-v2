import { EntityDataTable } from "@/components/DataTable";
import { Column } from "@/components/DataTable/models/column";
import { toCurrency } from "@/utils/utils";
import { DateLabel } from "@/components/ui";
import { Loan } from "@/features/Loans/models/loan";
import { LoanQuery } from "@/features/Loans/models/loanQuery";
import { getLoans } from "@/features/Loans/services/loanClient";
import { accountStatementsCacheKey } from "../../lib/constants";
import { EntityDataTableProps } from "@/models";
import { getFooterTotalAsCurrency } from "@/components/EntityForm/utils/utils";

type GeneralAccountStatementsDataTableProps = EntityDataTableProps<
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
    accessorKey: "projectId",
    header: "Proyecto",
    enableSorting: true,
  },
  {
    accessorKey: "id",
    enableSorting: true,
    header: "Código",
  },
  {
    accessorKey: "approvedAmount",
    header: "Monto Aprobado",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.approvedAmount),
    footer: (info) => getFooterTotalAsCurrency(info, "approvedAmount"),
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
    accessorKey: "lastTransactionDate",
    header: "Fecha Ult. Mov.",
    enableSorting: true,
    cell: ({ row }) => <DateLabel date={row.original.lastTransactionDate} />,
  },
];

const GeneralAccountStatementsDataTable = ({
  ...props
}: GeneralAccountStatementsDataTableProps) => {
  return (
    <EntityDataTable
      title="Estado de Cuenta"
      cacheKey={[...accountStatementsCacheKey, "general"]}
      loader={getLoans}
      columns={columns}
      {...props}
    />
  );
};

export default GeneralAccountStatementsDataTable;
