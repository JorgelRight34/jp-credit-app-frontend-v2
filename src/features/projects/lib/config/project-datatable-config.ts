import { DataTableConfig } from "@/components";
import { Project } from "../../models/project";
import { projectsQueryKey } from "../constants";
import { getProjects } from "../../services/projectClient";

export const projectDataTableConfig: DataTableConfig<Project> = {
    title: "Proyectos",
    columns: [
        { accessorKey: "id", header: "ID", enableSorting: true },
        { accessorKey: "name", header: "NOMBRE", enableSorting: true },
        { accessorKey: "loanCount", header: "PRÉSTAMOS", enableSorting: true },
        { accessorKey: "collateralCount", header: "GARANTÍAS", enableSorting: true },
    ],
    cacheKey: [projectsQueryKey],
    loader: getProjects
}