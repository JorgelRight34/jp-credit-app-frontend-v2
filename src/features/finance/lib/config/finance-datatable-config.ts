import { buildDateDataCell, buildDateGroupingCell, buildDateGroupingFooter, buildLinkDataCell, buildTotalRowsFooter, Column, getFooterTotalAsCurrency } from "@/components";
import { toCurrency } from "@/lib/utils";
import { FinancialBreakdown } from "../../models/financialBreakdown";
import { Projection } from "../../models/projection";
import { buildLoanLabelById, Loan, loanPaymentFrequencyStringMap } from "@/features/loans";
import { buildProfileFullName } from "@/features/profiles";
import { TimeUnit } from "@/models";
import { LoanProjection } from "../../models/projectionResult";

export const buildFinancialBreakdownColumns = (
    endDate?: string,
    timeDiff?: TimeUnit
): Array<Column<FinancialBreakdown>> => {
    const endDateObj = endDate ? new Date(endDate) : endDate;

    return [
        {
            accessorKey: "date",
            header: "FECHA",
            enableSorting: true,
            cell: ({ row }) => buildDateGroupingCell(row.original.date, endDateObj as Date, timeDiff),
            footer: buildTotalRowsFooter("Transacciones")
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
            accessorKey: "fee",
            header: "MORA",
            cell: ({ row }) => toCurrency(row.original.fee),
            footer: (info) => getFooterTotalAsCurrency(info, "fee"),
        },
    ]
}


export const buildProjectionTableColumns = (
    loansMap: Record<Loan["id"], LoanProjection> = {},
    startDate?: string | Date,
    endDate?: string | Date,
    timeDiff?: TimeUnit
): Array<Column<Projection>> => {
    return [
        {
            accessorKey: "date",
            header: "FECHA",
            enableSorting: true,
            cell: ({ row }) => buildDateDataCell(row.original.date),
            footer: buildDateGroupingFooter(r => r.date, startDate, endDate, timeDiff)
        },
        {
            accessorFn: (row) => row.loanId,
            header: "PRESTAMO",
            enableSorting: true,
            footer: buildTotalRowsFooter('Préstamos'),
            cell: ({ row }) => buildLinkDataCell(buildLoanLabelById(row.original.loanId), {
                to: "/loans/$id",
                params: {
                    id: row.original.loanId.toString()
                }
            }),
        },
        {
            accessorFn: (row) => loansMap[row.loanId].paymentFrequency,
            header: "FREC. PAGO",
            cell: ({ row }) =>
                loanPaymentFrequencyStringMap[loansMap[row.original.loanId].paymentFrequency],
        },
        {
            accessorFn: (row) => loansMap[row.loanId].clientOverview?.firstName,
            header: "CLIENTE",
            cell: ({ row }) => buildLinkDataCell(buildProfileFullName(loansMap[row.original.loanId].clientOverview), {
                to: "/profiles/$id",
                params: { id: loansMap[row.original.loanId].clientOverview.profileId.toString() }
            })
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
            accessorKey: "fee",
            header: "MORA",
            cell: ({ row }) => toCurrency(row.original.fee),
            footer: (info) => getFooterTotalAsCurrency(info, "fee"),
        },
    ]
}