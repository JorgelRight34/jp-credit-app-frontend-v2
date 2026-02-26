import { Column, getFooterTotalAsCurrency } from "@/components";
import { AmortizationPayment } from "../../models/amortizationPayment";
import { addDays, toCurrency, toFormattedDate, toTitleCase } from "@/lib/utils";

export const amortizationDatatableColumns: Array<Column<AmortizationPayment>> = [
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

export const createAmortizationPaymentNumberColumn = (startDate?: Date | string, paymentFrequencyPerYear?: number): Column<AmortizationPayment> => (
    {
        accessorKey: "number",
        header: "No.",
        cell: ({ row }) => {
            if (!startDate || !paymentFrequencyPerYear)
                return row.original.number;
            return toTitleCase(
                toFormattedDate(
                    addDays(
                        startDate,
                        (365 / paymentFrequencyPerYear) * row.original.number,
                    ),
                ),
            );
        },
    }
)
