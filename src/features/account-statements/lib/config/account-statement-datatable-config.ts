import { buildDateDataCell, buildLinkDataCell, DataTableConfig, getFooterTotalAsCurrency } from "@/components";
import { buildLoanLabelById, getLoans, Loan } from "@/features/loans";
import { toCurrency } from "@/lib/utils";

export const accountStatementDataTableConfig: DataTableConfig<Loan> = {
    columns: [
        {
            accessorKey: "startDate",
            header: "FECHA",
            enableSorting: true,
            cell: ({ row }) => buildDateDataCell(row.original.startDate),
        },
        {
            accessorKey: "projectId",
            header: "PROYECTO",
            cell: ({ row }) => buildLinkDataCell(row.original.projectId, {
                to: "/projects",
                search: { projectId: row.original.projectId }
            })
        },
        {
            accessorKey: "id",
            enableSorting: true,
            header: "CODIGO",
            cell: ({ row }) => buildLinkDataCell(buildLoanLabelById(row.original.id), {
                to: "/loans/$id",
                params: { id: row.original.id.toString() }
            })
        },
        {
            accessorKey: "approvedAmount",
            header: "MONTO APROBADO",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.approvedAmount),
            footer: (info) => getFooterTotalAsCurrency(info, "approvedAmount"),
        },
        {
            accessorKey: "principalBalance",
            header: "BALANCE CAPITAL",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.principalBalance),
            footer: (info) => getFooterTotalAsCurrency(info, "principalBalance"),
        },
        {
            accessorKey: "interestBalance",
            header: "INTERES",
            enableSorting: true,
            cell: ({ row }) => toCurrency(row.original.interestBalance),
            footer: (info) => getFooterTotalAsCurrency(info, "interestBalance"),
        },
        {
            accessorKey: "lastTransactionDate",
            header: "FECHA ULT. MOV.",
            enableSorting: true,
            cell: ({ row }) => buildDateDataCell(row.original.lastPaymentDate),
        }
    ],
    loader: getLoans
}