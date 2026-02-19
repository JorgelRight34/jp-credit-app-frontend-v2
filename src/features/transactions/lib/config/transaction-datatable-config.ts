import { createDateDataCell, createLinkDataCell, DataTableConfig } from "@/components";
import { Transaction } from "../../models/transaction";
import { sortDateRows, toCurrency } from "@/lib/utils";
import { getTransactionLabel } from "../utils";
import { getLoanLabel } from "@/features/loans";
import { getTransactions } from "../../services/transactionClient";

export const transactionDataTableConfig: DataTableConfig<Transaction> = {
    title: "Transacciones",
    columns: [
        {
            id: "date",
            accessorKey: "date",
            header: "FECHA",
            enableSorting: true,
            sortingFn: sortDateRows,
            cell: ({ row }) => createDateDataCell(row.original.date),
        },
        {
            header: "ACTOR",
            accessorFn: (row) => row.clientName,
            enableSorting: true,
            cell: ({ row }) => createLinkDataCell(row.original.clientName, { to: "/profiles/$id", params: { id: row.original.actorId?.toString() } }),
        },
        {
            id: "id",
            accessorKey: "id",
            header: "DOCUMENTO",
            enableSorting: true,
            cell: ({ row }) => getTransactionLabel(row.original),
        },
        {
            id: "value",
            accessorKey: "value",
            header: "MONTO",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.value),
        },
        {
            accessorKey: "capitalValue",
            header: "CAPITAL",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.capitalValue),
        },
        {
            accessorKey: "interestValue",
            header: "INTERESES",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.interestValue),
        },
        {
            accessorKey: "penaltyFee",
            header: "MORA",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.penaltyFee),
        },
        {
            id: "loanId",
            accessorKey: "loanId",
            header: "PRESTAMO",
            cell: ({ row }) => createLinkDataCell(getLoanLabel({ id: row.original.loanId }), { to: "/loans/$id", params: { id: row.original.loanId.toString() } }),
        }
    ],
    loader: getTransactions
}