import { CacheKey } from "@/models";
import { FinanceQuery } from "../models/financeQuery";
import { FinancialComponentType } from "../models/financialComponentType";
import { FinancialBreakdown } from "../models/financialBreakdown";
import { Column } from "@/components/DataTable/models/column";
import { toCurrency } from "@/utils/utils";
import { getFooterTotalAsCurrency } from "@/components/EntityForm/utils/utils";
import { DateLabel } from "@/components/ui";
import { getDateGroupingLabel } from "./lib";
import { HeaderContext } from "@tanstack/react-table";
import { Transaction } from "@/features/Transactions/models/transaction";

export const incomesQueryKey = "incomes";

export const expensesQueryKey = "expenses";

export const projectionsCacheKey: CacheKey = ["projections"];

export const defaultFinanceQuery: FinanceQuery = {
    start: new Date(2020, 1, 1),
    end: new Date(2025, 1, 1),
    timeUnit: 30,
}

export const financialComponentTypesConfig: Record<
    FinancialComponentType,
    { color: string; label: string }
> = {
    capital: {
        color: "#2563EB", // Indigo 600
        label: "Capital",
    },
    interest: {
        color: "#F59E0B", // Amber 500
        label: "Interés",
    },
    fee: {
        color: "#DC2626", // Red 600
        label: "Mora",
    },
    totalItems: {
        color: "#7C3AED",
        label: "Cantidad",
    },
    total: {
        color: "#059669",
        label: "Total",
    },
};

export const financialBreakdownBaseColumns: Column<FinancialBreakdown>[] = [
    {
        accessorKey: "capital",
        header: "Capital",
        cell: ({ row }) => toCurrency(row.original.capital),
        footer: (info) => getFooterTotalAsCurrency(info, "capital")
    },
    {
        accessorKey: "interest",
        header: "Interés",
        cell: ({ row }) => toCurrency(row.original.interest),
        footer: (info) => getFooterTotalAsCurrency(info, "interest"),
    },
]

export const transactionLoanColumnFooter = (info: HeaderContext<Transaction, unknown>) => `${info.table.options.data.length} préstamos`;

export const dateGroupingColumn = (query: FinanceQuery): Column<FinancialBreakdown> => ({
    accessorKey: "date",
    header: "Fecha",
    enableSorting: true,
    cell: ({ row }) => DateLabel({ date: row.original.date }),
    footer: (info) => {
        const firstRow = info.table.getRowModel().rows[0]?.original;
        if (!firstRow?.date) return "—";

        return getDateGroupingLabel(firstRow.date, query.timeUnit ?? 1, {
            minDate: query.start,
            maxDate: query.end,
        });
    },
});