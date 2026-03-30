import { buildDateDataCell, buildLinkDataCell, DataTableConfig, getFooterTotalAsCurrency } from "@/components";
import { buildLoanLabelById, getLoans, Loan } from "@/features/loans";
import { buildProfileFullName } from "@/features/profiles";
import { toCurrency } from "@/lib/utils";

export const guarantorAccountStatementDataTableConfig: DataTableConfig<Loan> = {
    columns: [
        {
            accessorKey: "startDate",
            header: "FECHA",
            enableSorting: true,
            cell: ({ row }) => buildDateDataCell(row.original.startDate),
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
            accessorKey: "disbursedAmount",
            header: "DESEMBOLSADO",
            cell: ({ row }) => toCurrency(row.original.disbursedAmount)
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
            accessorFn: (l) => l.client.firstName,
            header: "CLIENTE",
            enableSorting: true,
            cell: ({ row }) => buildLinkDataCell(buildProfileFullName(row.original.client), {
                to: "/profiles/$id",
                params: { id: row.original.clientId.toString() }
            }),
        }
    ],
    loader: getLoans
}