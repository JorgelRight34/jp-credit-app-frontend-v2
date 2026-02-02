import { getRoles } from "../../services/authService";
import { permissionsQueryKey } from "../constants";
import type { Role } from "../../models/role";
import type { DataTableConfig } from "@/components";
import { createLinkDataCell } from "@/components";

export const rolesDataTableConfig: DataTableConfig<Role> = {
    title: "Roles",
    cacheKey: [permissionsQueryKey, "roles"],
    columns: [
        { id: "name", accessorKey: "name", header: "NOMBRE", enableSorting: true, cell: ({ row }) => createLinkDataCell(row.original.name, {}) },
        { id: "usersCount", accessorKey: "usersCount", header: "USUARIOS", enableSorting: true },
        { id: "id", accessorKey: "id", header: "ID", enableSorting: true },
    ],
    onExpand: () => "pendiente",
    loader: getRoles
}