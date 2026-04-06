import { Column } from "@/components";
import { ChangeLog } from "../../models/changeLog";

export const changeLogDataTableColumns: Array<Column<ChangeLog>> = [
    { accessorKey: "entityId", header: "ID", enableSorting: true },
    { accessorKey: "entityType", header: "OBJETO", enableSorting: true },
    { accessorKey: "username", header: "USUARIO", enableSorting: true }
]