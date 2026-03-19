import { buildLinkDataCell, DataTableConfig } from "@/components";
import { Project } from "../../models/project";

export const projectsDataTableConfigColumns: DataTableConfig<Project>["columns"] = [
    { accessorKey: "id", header: "ID", enableSorting: true },
    { accessorKey: "name", header: "NOMBRE", cell: ({ row }) => buildLinkDataCell(row.original.name, {}), enableSorting: true },
    { accessorKey: "loanCount", header: "PRÉSTAMOS", enableSorting: true },
]