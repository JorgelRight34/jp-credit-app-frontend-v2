import { Transaction } from "../models/transaction";
import { EntityDataTableProps } from "../../../components/DataTable/models/entityDataTableProps";
import EntityDataTable from "../../../components/DataTable/components/EntityDataTable";
import { TransactionsQuery } from "../models/transactionsQuery";
import { getTransactions } from "../services/transactionsClient";
import { transactionsCacheKey } from "../lib/constants";
import { useRouter } from "@/hooks/useRouter";
import { Column } from "@/components/DataTable/models/column";
import LinkToProfile from "@/features/Profiles/components/LinkToProfile";
import LinkToLoan from "@/features/Loans/components/LinkToLoan";
import { sortDateRows, toCurrency } from "@/utils/utils";
import { DateLabel } from "@/components/ui";
import { getTransactionIdLabel } from "../lib/utils";

type TransactionsDataTableProps = EntityDataTableProps<
  Transaction,
  TransactionsQuery
>;

const columns: Column<Transaction>[] = [
  {
    id: "date",
    accessorKey: "date",
    header: "Fecha",
    enableSorting: true,
    sortingFn: sortDateRows,
    cell: ({ row }) => <DateLabel date={row.original.date} />,
  },
  {
    header: "Cliente",
    accessorFn: (row) => row.clientName,
    enableSorting: true,
    cell: ({ row }) => <LinkToProfile profile={row.original.clientName} />,
  },
  {
    id: "id",
    accessorKey: "id",
    header: "Documento",
    enableSorting: true,
    cell: ({ row }) => getTransactionIdLabel(row.original),
  },
  {
    id: "value",
    accessorKey: "value",
    header: "Monto",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.value),
  },
  {
    accessorKey: "capitalValue",
    header: "Capital",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.capitalValue),
  },
  {
    accessorKey: "interestValue",
    header: "Intereses",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.interestValue),
  },
  {
    accessorKey: "penaltyFee",
    header: "Mora",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.penaltyFee),
  },
  {
    id: "loanId",
    accessorKey: "loanId",
    header: "Préstamo",
    cell: ({ row }) => <LinkToLoan id={row.original.loanId} />,
  },
];

const TransactionsDataTable = ({
  query,
  onRowClick,
  ...props
}: TransactionsDataTableProps) => {
  const router = useRouter();

  return (
    <EntityDataTable<Transaction, TransactionsQuery>
      title="transacción"
      columns={columns}
      loader={getTransactions}
      cacheKey={transactionsCacheKey}
      query={query}
      onRowClick={onRowClick ?? ((t) => router.push(`/transactions/${t.id}`))}
      {...props}
    />
  );
};

export default TransactionsDataTable;
