import { Transaction } from "../models/transaction";
import { getTransactionIdLabel } from "../lib/utils";
import { TransactionsQuery } from "../models/transactionsQuery";
import {
  Column,
  DateLabel,
  EntityDataTable,
  EntityDataTableProps,
} from "@/components";
import { sortDateRows, toCurrency } from "@/utils";
import { LinkToProfile } from "@/features/profiles";
import { LinkToLoan } from "@/features/loans";
import { useRouter } from "@/hooks/useRouter";
import { transactionClient } from "../services/transactionsClient";
import { transactionsCacheKey } from "../lib/constants";

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
      loader={transactionClient.getTransactions}
      cacheKey={transactionsCacheKey}
      query={query}
      onRowClick={onRowClick ?? ((t) => router.push(`/transactions/${t.id}`))}
      {...props}
    />
  );
};

export default TransactionsDataTable;
