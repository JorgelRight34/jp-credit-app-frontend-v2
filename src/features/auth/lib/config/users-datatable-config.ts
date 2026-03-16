import { getUsers } from "../../services/userClient"
import type { User } from "../../../../models/user"
import type { DataTableConfig } from "@/components";
import { buildDateDataCell, buildIsActiveDataCell, buildLinkDataCell } from "@/components"

export const usersDatatableConfig: DataTableConfig<User> = {
    title: 'Accesos',
    columns: [
        {
            id: 'username',
            header: 'USUARIO',
            accessorKey: 'username',
            enableSorting: true,
            cell: ({ row }) => buildLinkDataCell(row.original.username, {
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
            cell: ({ row }) => buildDateDataCell(row.original.createdAt)
        },
        {
            id: "isActive",
            header: "ESTADO",
            accessorKey: "isActive",
            cell: ({ row }) => buildIsActiveDataCell(row.original.isActive)
        }
    ],
    loader: getUsers,
}