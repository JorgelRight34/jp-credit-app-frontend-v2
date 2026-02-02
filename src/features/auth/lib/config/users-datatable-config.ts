import { usersQueryKey } from "../constants"
import { getUsers } from "../../services/userClient"
import type { User } from "../../models/user"
import type { DataTableConfig } from "@/components";
import { createDateDataCell, createLinkDataCell } from "@/components"

export const usersDatatableConfig: DataTableConfig<User> = {
    title: 'Accesos',
    cacheKey: [usersQueryKey],
    columns: [
        {
            id: 'username',
            header: 'USUARIO',
            accessorKey: 'username',
            enableSorting: true,
            cell: ({ row }) => createLinkDataCell(row.original.username, {
                to: `/access-control/users/$username`,
                params: { username: row.original.username }
            })
        },
        {
            id: 'firstName',
            header: 'NOMBRES',
            accessorKey: 'firstName',
            enableSorting: true,
        },
        {
            id: 'lastName',
            header: 'APELLIDOS',
            accessorKey: 'lastName',
            enableSorting: true,
        },
        { id: 'email', header: 'EMAIL', accessorKey: 'email' },
        {
            id: "createdAt",
            header: "FECHA",
            accessorKey: "createdAt",
            cell: ({ row }) => createDateDataCell(row.original.createdAt)
        }
    ],
    loader: getUsers,
}