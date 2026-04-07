import { buildDateDataCell, buildLinkDataCell, Column } from "@/components";
import { ChangeLog } from "../../models/changeLog";

export const changeLogDataTableColumns: Array<Column<ChangeLog>> = [
    { accessorKey: "entityId", header: "ID", enableSorting: true },
    { accessorKey: "date", header: "FECHA", enableSorting: true, cell: ({ row }) => buildDateDataCell(row.original.date) },
    {
        accessorKey: "username", header: "USUARIO", cell: ({ row }) => buildLinkDataCell(
            row.original.username,
            { to: "/access-control/users/$username", params: { username: row.original.username } }
        ), enableSorting: true
    },
]