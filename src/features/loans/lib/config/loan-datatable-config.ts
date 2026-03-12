import { getLoans } from "../../services/loanClient";
import type { Loan } from "../../models/loan";
import type { BuildSearchInputDataTableConfigHandler, DataTableConfig } from "@/components";
import { buildDateDataCell, buildExpandableDescriptionCell, buildLinkDataCell, buildSingleSelectCell } from "@/components";
import { sortDateRows, toCurrency } from "@/lib/utils";

export const loansDataTableColumns: DataTableConfig<Loan>["columns"] = [
    { accessorKey: "id", header: "ID" },
    {
        header: "CLIENTE",
        accessorFn: (row) => row.client?.lastName,
        enableSorting: true,
        cell: ({ row }) => buildLinkDataCell(
            `${row.original.client.lastName}, ${row.original.client.firstName}`,
            {
                to: "/loans/$id", params: { id: row.original.id.toString() }
            }),
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
        cell: ({ row }) => buildDateDataCell(row.original.lastPaymentDate),
    },
    {
        accessorKey: "createdAt",
        header: "FECHA",
        enableSorting: true,
        cell: ({ row }) => buildDateDataCell(row.original.startDate),
    },
    {
        accessorKey: "lastPaymentDate",
        header: "ÚLT. PAGO",
        enableSorting: true,
        sortingFn: sortDateRows,
        cell: ({ row }) => buildDateDataCell(row.original.lastPaymentDate),
    },
    {
        accessorKey: "lastPaymentDate",
        header: "ÚLT. PAGO",
        enableSorting: true,
        sortingFn: sortDateRows,
        cell: ({ row }) => buildDateDataCell(row.original.lastPaymentDate),
    },
]

export const loanDataTableConfig: DataTableConfig<Loan> = {
    columns: loansDataTableColumns,
    loader: getLoans
}

export const buildLoanSearchInputDataTableConfig: BuildSearchInputDataTableConfigHandler<Loan> = (setValue) => {
    return ({
        columns: [
            { id: "id", header: "ID", accessorKey: "id", enableSorting: true },
            {
                header: "CLIENTE",
                accessorFn: (row) => row.client?.firstName,
                enableSorting: true,
                cell: ({ row }) => buildLinkDataCell(`${row.original.client.lastName}, ${row.original.client.firstName}`, {}),
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
            { id: "select", header: "OPCIONES", cell: ({ row }) => buildSingleSelectCell(() => setValue(row.original)) }
        ],
        allowExpand: true,
        onExpand: (row) => buildExpandableDescriptionCell(row.original.description ?? "Sin descripción"),
        loader: getLoans
    })
}