import { usersQueryKey } from '../lib/constants'
import { getUsers } from '../services/userClient'
import { DataTableContainer, Input } from '@/components'

const UsersDataTable = () => {
  return (
    <DataTableContainer
      searchConfig={{
        options: [{ name: 'id', label: 'Id', width: 2, type: Input }],
        advanced: [],
      }}
      datatableConfig={{
        title: 'Usuarios',
        columns: [
          { id: 'id', header: 'Id', accessorKey: 'id', enableSorting: true },
          {
            id: 'username',
            header: 'Usuario',
            accessorKey: 'username',
            enableSorting: true,
          },
          {
            id: 'firstName',
            header: 'Nombres',
            accessorKey: 'firstName',
            enableSorting: true,
          },
          {
            id: 'lastName',
            header: 'Apellidos',
            accessorKey: 'lastName',
            enableSorting: true,
          },
          { id: 'email', header: 'Email', accessorKey: 'email' },
        ],
        cacheKey: [usersQueryKey],
        loader: getUsers,
      }}
    />
  )
}

export default UsersDataTable
