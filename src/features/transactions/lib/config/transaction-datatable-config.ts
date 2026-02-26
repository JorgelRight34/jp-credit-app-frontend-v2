import { buildDateDataCell, buildExpandableDescriptionCell, buildLinkDataCell, DataTableConfig } from "@/components";
import { Transaction } from "../../models/transaction";
import { sortDateRows, toCurrency } from "@/lib/utils";
import { buildTransactionLabel } from "../utils";
import { buildLoanLabelById } from "@/features/loans";
import { getTransactions } from "../../services/transactionClient";
import { buildProfileFullName } from "@/features/profiles";

export const transactionDataTableConfig: DataTableConfig<Transaction> = {
    columns: [
        {
            id: "id",
            accessorKey: "id",
            header: "DOCUMENTO",
            enableSorting: true,
            cell: ({ row }) => buildLinkDataCell(buildTransactionLabel(row.original), {
                to: "/transactions/$id",
                params: { id: row.original.id.toString() }
            }),
        },
        {
            header: "CLIENTE",
            accessorFn: (row) => row.client.firstName,
            enableSorting: true,
            cell: ({ row }) => buildLinkDataCell(buildProfileFullName(row.original.client), {
                to: "/profiles/$id",
                params: { id: row.original.actorId?.toString() }
            }),
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
            cell: ({ row }) => buildLinkDataCell(buildLoanLabelById(row.original.loanId), {
                to: "/loans/$id",
                params: { id: row.original.loanId.toString() }
            }),
        },
        {
            id: "date",
            accessorKey: "date",
            header: "FECHA",
            enableSorting: true,
            sortingFn: sortDateRows,
            cell: ({ row }) => buildDateDataCell(row.original.date),
        },
    ],
    allowExpand: true,
    onExpand: (row) => buildExpandableDescriptionCell(row.original.description ?? "Sin descripción"),
    loader: getTransactions
}