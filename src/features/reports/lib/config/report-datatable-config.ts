import { buildBookmarkedDataCell, buildLinkDataCell, DataTableConfig } from "@/components";
import { Report } from "../../models/report";
import { getReports } from "../../services/reportsClient";
import { reportTemplateKeysLabels } from "../constants";

export const reportDataTableConfig: DataTableConfig<Report> = {
    columns: [
        { accessorKey: "id", header: "ID", enableSorting: true },
        {
            accessorKey: "title",
            header: "TITULO",
            cell: ({ row }) => buildLinkDataCell(row.original.title, {
                to: "/reports/$id",
                params: { id: row.original.id.toString() }
            }),
            enableSorting: true
        },
        {
            accessorKey: "key",
            header: "CATEGORIA",
            cell: ({ row }) => reportTemplateKeysLabels[row.original.key],
            enableSorting: true
        },
        {
            accessorKey: "bookmark",
            header: "MARCADO",
            cell: ({ row }) => buildBookmarkedDataCell(row.original.bookmark),
            enableSorting: true
        },
    ],
    loader: getReports
}