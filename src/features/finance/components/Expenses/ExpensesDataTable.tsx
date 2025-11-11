import { Column } from "@/components/DataTable/models/column";
import { FinancialBreakdown } from "../../models/financialBreakdown";
import {
  financialBreakdownBaseColumns,
  transactionLoanColumnFooter,
} from "../../lib/constants";
import { sortDateRows, toCurrency } from "@/utils/utils";
import FinanceGroupedTable, {
  FinancialBreakdownDataTableProps,
} from "../FinanceGroupedTable";
import { TransactionType } from "@/features/Transactions/models/transactionType";
import { Transaction } from "@/features/Transactions/models/transaction";
import { DateLabel } from "@/components/ui";
import LinkToLoan from "@/features/Loans/components/LinkToLoan";
import { getFooterTotalAsCurrency } from "@/components/EntityForm/utils/utils";

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
