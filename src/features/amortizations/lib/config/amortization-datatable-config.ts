import { buildLinkDataCell, Column, getFooterTotalAsCurrency } from "@/components";
import { AmortizationPayment } from "../../models/amortizationPayment";
import { addDays, toCurrency, toFormattedDate, toTitleCase } from "@/lib/utils";

export const amortizationDatatableColumns: Array<Column<AmortizationPayment>> = [
    {
        header: "NO",
        cell: ({ row }) => buildLinkDataCell(`Cuota No. ${row.index + 1}`, {}),
        footer: () => "TOTAL:"
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
        footer: (context) => getFooterTotalAsCurrency(context, "capitalValue")
    },
    {
        header: "BALANCE",
        cell: ({ row }) => toCurrency(row.original.principalBalance),
        footer: (context) => getFooterTotalAsCurrency(context, "principalBalance")
    },
]

export const createAmortizationPaymentNumberColumn = (startDate?: Date | string, paymentFrequencyPerYear?: number): Column<AmortizationPayment> => (
    {
        accessorKey: "number",
        header: "FECHA",
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
