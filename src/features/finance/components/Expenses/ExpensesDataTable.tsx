import { Column, DateLabel, getFooterTotalAsCurrency } from "@/components";
import { FinancialBreakdown } from "../../models/financialBreakdown";
import {
  financialBreakdownBaseColumns,
  transactionLoanColumnFooter,
} from "../../lib/constants";
import { Transaction, TransactionType } from "@/features/transactions";
import { sortDateRows, toCurrency } from "@/utils/utils";
import { LinkToLoan } from "@/features/loans";
import FinanceGroupedTable, {
  FinancialBreakdownDataTableProps,
} from "../FinanceGroupedTable";

const columns: Column<FinancialBreakdown>[] = [
  financialBreakdownBaseColumns[0],
];

const groupColumns: Column<Transaction>[] = [
  {
    id: "date",
    accessorKey: "date",
    header: "Fecha",
    enableSorting: true,
    sortingFn: sortDateRows,
    cell: ({ row }) => <DateLabel date={row.original.date} />,
  },
  {
    id: "clientName",
    accessorKey: "clientName",
    header: "Cliente",
  },
  {
    id: "loanId",
    accessorKey: "loanId",
    header: "Préstamo",
    cell: ({ row }) => <LinkToLoan id={row.original.loanId} />,
    footer: transactionLoanColumnFooter,
  },
  {
    accessorKey: "capitalValue",
    header: "Capital",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.capitalValue),
    footer: (info) => getFooterTotalAsCurrency(info, "capitalValue"),
  },
];

const ExpensesDataTable = ({
  data = [],
  query,
}: FinancialBreakdownDataTableProps) => {
  return (
    <FinanceGroupedTable
      data={data}
      type={TransactionType.DS}
      columns={columns}
      groupColumns={groupColumns}
      query={query}
    />
  );
};

export default ExpensesDataTable;
