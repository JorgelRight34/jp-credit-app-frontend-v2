import { buildLinkDataCell, Columns, Route } from "@/components";
import { Report } from "../../models/report";

export const buildReportDataTableColumns = (to: Route): Columns<Report> => [
    { accessorKey: "id", header: "ID", enableSorting: true },
    {
        accessorKey: "title",
        header: "TITULO",
        cell: ({ row }) => buildLinkDataCell(row.original.title, {
            to,
            params: { id: row.original.id.toString() }
        }),
        enableSorting: true
    },
]
