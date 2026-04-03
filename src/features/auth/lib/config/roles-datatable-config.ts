import { getRoles } from "../../services/authService";
import UsersDataTable from "../../components/users-datatable";
import type { Role } from "../../models/role";
import type { DataTableConfig } from "@/components";
import { buildLinkDataCell } from "@/components";

export const rolesTableColumns: DataTableConfig<Role>["columns"] = [
    {
        id: "name",
        accessorKey: "name",
        header: "NOMBRE",
        enableSorting: true,
        cell: ({ row }) => buildLinkDataCell(row.original.name, { to: "/access-control/roles/$id", params: { id: row.original.id.toString() } })
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
        cell: ({ row }) => buildLinkDataCell(row.original.name, { to: "/access-control/roles/$id", params: { id: row.original.id.toString() } })
    },
    { id: "id", accessorKey: "id", header: "ID", enableSorting: true },
]


export const rolesDataTableConfig: DataTableConfig<Role> = {
    columns: rolesTableColumns,
    allowExpand: true,
    onExpand: (row) => UsersDataTable({ initialQuery: { role: row.original.normalizedName } }),
    loader: getRoles
}