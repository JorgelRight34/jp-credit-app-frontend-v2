import { Column } from "@/components/DataTable/models/column";
import { sortDateRows, toCurrency } from "@/utils/utils";
import FinanceGroupedTable, {
  FinancialBreakdownDataTableProps,
} from "../FinanceGroupedTable";
import { Transaction } from "@/features/Transactions/models/transaction";
import { DateLabel } from "@/components/ui";
import LinkToLoan from "@/features/Loans/components/LinkToLoan";
import { TransactionType } from "@/features/Transactions/models/transactionType";
import {
  financialBreakdownBaseColumns,
  transactionLoanColumnFooter,
} from "../../lib/constants";
import { getFooterTotalAsCurrency } from "@/components/EntityForm/utils/utils";

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
  {
    accessorKey: "interestValue",
    header: "Intereses",
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
    id: "total",
    accessorKey: "value",
    header: "Total",
    cell: ({ row }) => toCurrency(row.original.value),
    footer: (info) => getFooterTotalAsCurrency(info, "value"),
  },
];

const IncomesDataTable = ({
  data = [],
  query,
}: FinancialBreakdownDataTableProps) => {
  return (
    <FinanceGroupedTable
      data={data}
      columns={financialBreakdownBaseColumns}
      groupColumns={groupColumns}
      type={TransactionType.PC}
      query={query}
    />
  );
};

export default IncomesDataTable;
