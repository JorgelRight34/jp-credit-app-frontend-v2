import { EntityDataTable } from "@/components/DataTable";
import { Column } from "@/components/DataTable/models/column";
import { toCurrency } from "@/utils/utils";
import { accountStatementsCacheKey } from "../../lib/constants";
import { Transaction } from "@/features/Transactions/models/transaction";
import { TransactionsQuery } from "@/features/Transactions/models/transactionsQuery";
import { getTransactions } from "@/features/Transactions/services/transactionsClient";
import { DateLabel } from "@/components/ui";
import { getTransactionIdLabel } from "@/features/Transactions/lib/utils";
import { EntityDataTableProps } from "@/models";
import { getFooterTotalAsCurrency } from "@/components/EntityForm/utils/utils";

type ClientAccountStatementsDataTableProps = EntityDataTableProps<
  Transaction,
  TransactionsQuery
>;

const columns: Column<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Fecha",
    enableSorting: true,
    cell: ({ row }) => <DateLabel date={row.original.date} />,
  },
  {
    accessorKey: "id",
    header: "Documento",
    enableSorting: true,
    cell: ({ row }) => getTransactionIdLabel(row.original),
  },
  {
    accessorKey: "capitalValue",
    header: "Capital",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.capitalValue),
    footer: (info) => getFooterTotalAsCurrency(info, "capitalValue"),
  },
  {
    accessorKey: "interestValue",
    header: "Interés",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.interestValue),
    footer: (info) => getFooterTotalAsCurrency(info, "interestValue"),
  },
  {
    accessorKey: "penaltyFee",
    header: "Mora",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.penaltyFee),
    footer: (info) => getFooterTotalAsCurrency(info, "penaltyFee"),
  },
  {
    accessorKey: "total",
    header: "Total Pagado",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.total),
    footer: (info) => getFooterTotalAsCurrency(info, "total"),
  },
];

const ClientAccountStatementsDataTable = ({
  ...props
}: ClientAccountStatementsDataTableProps) => {
  return (
    <EntityDataTable
      title="Estado de Cuenta"
      cacheKey={[...accountStatementsCacheKey, "client"]}
      loader={getTransactions}
      columns={columns}
      {...props}
    />
  );
};

export default ClientAccountStatementsDataTable;
