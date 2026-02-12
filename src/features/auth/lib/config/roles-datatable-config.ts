import { getRoles } from "../../services/authService";
import { rolesQueryKey } from "../constants";
import UsersDataTable from "../../components/users-datatable";
import type { Role } from "../../models/role";
import type { DataTableConfig } from "@/components";
import { createLinkDataCell } from "@/components";

export const rolesTableColumns: DataTableConfig<Role>["columns"] = [
    {
        id: "name",
        accessorKey: "name",
        header: "NOMBRE",
        enableSorting: true,
        cell: ({ row }) => createLinkDataCell(row.original.name, { to: "/access-control/roles/$id", params: { id: row.original.id.toString() } })
    },
    { id: "usersCount", accessorKey: "usersCount", header: "USUARIOS", enableSorting: true },
    { id: "id", accessorKey: "id", header: "ID", enableSorting: true },
]

export const userRolesTableColumns: DataTableConfig<Role>["columns"] = [
    {
        id: "name",
        accessorKey: "name",
        header: "NOMBRE",
        enableSorting: true,
        cell: ({ row }) => createLinkDataCell(row.original.name, { to: "/access-control/roles/$id", params: { id: row.original.id.toString() } })
    },
    { id: "id", accessorKey: "id", header: "ID", enableSorting: true },
]


export const rolesDataTableConfig: DataTableConfig<Role> = {
    title: "Roles",
    cacheKey: [rolesQueryKey, "all"],
    columns: rolesTableColumns,
    onExpand: (row) => UsersDataTable({ initialQuery: { role: row.original.normalizedName } }),
    loader: getRoles
}