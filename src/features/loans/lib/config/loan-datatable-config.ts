import { getLoans } from "../../services/loanClient";
import { loansQueryKey } from "../constants";
import type { Loan } from "../../models/loan";
import type { DataTableConfig } from "@/components";
import { createDateDataCell, createLinkDataCell, createSingleSelectCell } from "@/components";
import { sortDateRows, toCurrency } from "@/lib/utils";

export const loanDataTableConfig: DataTableConfig<Loan> = {
    title: "Préstamos",
    columns: [
        { accessorKey: "id", header: "ID" },
        {
            header: "CLIENTE",
            accessorFn: (row) => row.client?.name,
            enableSorting: true,
            cell: ({ row }) => createLinkDataCell(row.original.client?.name, { to: "/loans/$id", params: { id: row.original.id.toString() } }),
        },
        {
            accessorKey: "disbursedAmount",
            header: "DESEMBOLSADO",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.disbursedAmount),
        },
        {
            accessorKey: "paymentValue",
            header: "CUOTA",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.paymentValue),
        },
        {
            accessorKey: "principalBalance",
            header: "B. CAPITAL",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.principalBalance),
        },
        {
            accessorKey: "accruedInterest",
            header: "INTERESES",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.accruedInterest),
        },
        {
            accessorKey: "totalFees",
            header: "MORA",
            cell: ({ row }) => toCurrency(row.original.totalFees),
        },

        {
            accessorKey: "lastPaymentDate",
            header: "ÚLT. PAGO",
            enableSorting: true,
            sortingFn: sortDateRows,
            cell: ({ row }) => createDateDataCell(row.original.lastPaymentDate),
        },
        {
            accessorKey: "createdAt",
            header: "FECHA",
            enableSorting: true,
            cell: ({ row }) => createDateDataCell(row.original.startDate),
        },
    ],
    cacheKey: [loansQueryKey],
    loader: getLoans
}

export const createLoanSearchInputDataTableConfig = (onRowClick: (loan: Loan) => void): DataTableConfig<Loan> => {
    console.log("recreating")
    return ({
        title: "Préstamos",
        columns: [
            { id: "id", header: "ID", enableSorting: true },
            {
                header: "CLIENTE",
                accessorFn: (row) => row.client?.name,
                enableSorting: true,
                cell: ({ row }) => createLinkDataCell(row.original.client?.name, { to: "/profiles/$id", params: { id: row.original.clientId.toString() } }),
            },
            {
                accessorKey: "disbursedAmount",
                header: "DESEMBOLSADO",
                enableSorting: true,
                cell: ({ row }) => toCurrency(row.original.disbursedAmount),
            },
            {
                accessorKey: "paymentValue",
                header: "CUOTA",
                enableSorting: true,
                cell: ({ row }) => toCurrency(row.original.paymentValue),
            },
            { id: "select", cell: ({ row }) => createSingleSelectCell(() => onRowClick(row.original)) }
        ],
        cacheKey: [loansQueryKey],
        loader: getLoans
    })
}