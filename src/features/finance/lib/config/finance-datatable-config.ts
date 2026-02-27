import { buildDateDataCell, Column, getFooterTotalAsCurrency } from "@/components";
import { toCurrency } from "@/lib/utils";
import { FinancialBreakdown } from "../../models/financialBreakdown";

export const incomeTableColumns: Array<Column<FinancialBreakdown>> = [
    {
        accessorKey: "date",
        header: "FECHA",
        cell: ({ row }) => buildDateDataCell(row.original.date),
        enableSorting: true,
        footer: "TOTAL"
    },
    {
        accessorKey: "capital",
        header: "CAPITAL",
        cell: ({ row }) => toCurrency(row.original.capital),
        footer: (info) => getFooterTotalAsCurrency(info, "capital")
    },
    {
        accessorKey: "interest",
        header: "INTERES",
        cell: ({ row }) => toCurrency(row.original.interest),
        footer: (info) => getFooterTotalAsCurrency(info, "interest"),
    },
    {
        accessorKey: "interest",
        header: "MORA",
        cell: ({ row }) => toCurrency(row.original.fee),
        footer: (info) => getFooterTotalAsCurrency(info, "fee"),
    },
]