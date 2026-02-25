import { buildLinkDataCell, DataTableConfig } from "@/components";
import { Project } from "../../models/project";
import { getProjects } from "../../services/projectClient";

export const projectsDataTableConfigColumns: DataTableConfig<Project>["columns"] = [
    { accessorKey: "id", header: "ID", enableSorting: true },
    { accessorKey: "name", header: "NOMBRE", cell: ({ row }) => buildLinkDataCell(row.original.name, {}), enableSorting: true },
    { accessorKey: "loanCount", header: "PRÉSTAMOS", enableSorting: true },
]

export const projectDataTableConfig: DataTableConfig<Project> = {
    title: "Proyectos",
    columns: projectsDataTableConfigColumns,
    loader: getProjects
}