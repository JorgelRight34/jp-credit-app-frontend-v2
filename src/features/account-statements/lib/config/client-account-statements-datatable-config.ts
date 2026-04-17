import { buildDateDataCell, buildLinkDataCell, DataTableConfig, getFooterTotalAsCurrency } from "@/components";
import { buildTransactionLabel, getTransactions, Transaction } from "@/features/transactions";
import { toCurrency } from "@/lib/utils";

export const clientAccountStatementDataTableConfig: DataTableConfig<Transaction> = {
    columns: [
        {
            accessorKey: "date",
            header: "FECHA",
            enableSorting: true,
            cell: ({ row }) => buildDateDataCell(row.original.date),
        },
        {
            accessorKey: "id",
            header: "DOCUMENTO",
            enableSorting: true,
            cell: ({ row }) => buildLinkDataCell(buildTransactionLabel(row.original), {
                to: "/transactions/$id",
                params: { id: row.original.id.toString() }
            }),
        },
        {
            accessorKey: "capitalValue",
            header: "CAPITAL",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.capitalValue),
            footer: (info) => getFooterTotalAsCurrency(info, "capitalValue"),
        },
        {
            accessorKey: "interestValue",
            header: "INTERES",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.interestValue),
            footer: (info) => getFooterTotalAsCurrency(info, "interestValue"),
        },
        {
            accessorKey: "feePaid",
            header: "MORA",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.feePaid),
            footer: (info) => getFooterTotalAsCurrency(info, "feePaid"),
        },
        {
            accessorKey: "total",
            header: "MONTO",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.value),
            footer: (info) => getFooterTotalAsCurrency(info, "value"),
        },
    ],
    loader: getTransactions
}
