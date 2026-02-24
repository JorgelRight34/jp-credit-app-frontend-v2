import { createDateDataCell, createLinkDataCell, DataTableConfig } from "@/components";
import { ClosedPeriod } from "../../models/accountingPeriod";
import { getClosedPeriods } from "../../services/transactionClient";

export const closedPeriodsDataTableConfig: DataTableConfig<ClosedPeriod> = {
    title: "Periodos contables",
    columns: [
        { accessorKey: "id", header: "ID", enableSorting: true },
        {
            accessorKey: "startDate",
            header: "INICIO",
            cell: ({ row }) => createDateDataCell(row.original.startDate),
            enableSorting: true
        },
        {
            accessorKey: "endDate",
            header: "FIN",
            cell: ({ row }) => createDateDataCell(row.original.endDate),
            enableSorting: true
        },
        {
            header: "OPCIONES",
            cell: () => createLinkDataCell("Ver detalles", { to: "/transactions" })
        }
    ],
    loader: getClosedPeriods
}