import { Column, DataTableConfig, getFooterTotalAsCurrency } from "@/components";
import { AmortizationPayment } from "../../models/amortizationPayment";
import { toCurrency } from "@/lib/utils";
import { amortizationQueryKey } from "../constants";
import { getPagedAmortization } from "../../services/amortizationService";
import { AmortizationCalculatorInput } from "../../models/amortizationCalculatorInput";

const amortizationDatatableColumns: Array<Column<AmortizationPayment>> = [
    {
        accessorKey: "number",
        header: "NO.",
    },
    {
        header: "CUOTA",
        cell: ({ row }) => toCurrency(row.original.total),
        footer: (context) => getFooterTotalAsCurrency(context, "total")
    },
    {
        header: "INTERESES",
        cell: ({ row }) => toCurrency(row.original.interestValue),
        footer: (context) => getFooterTotalAsCurrency(context, "interestValue")
    },
    {
        header: "CAPITAL",
        cell: ({ row }) => toCurrency(row.original.capitalValue),
    },
    {
        header: "BALANCE",
        cell: ({ row }) => toCurrency(row.original.principalBalance),
    },
]

export const amortizationDatatableConfig: DataTableConfig<AmortizationPayment, AmortizationCalculatorInput> = ({
    title: "Amortizaciones",
    columns: amortizationDatatableColumns,
    cacheKey: [amortizationQueryKey],
    loader: getPagedAmortization
})