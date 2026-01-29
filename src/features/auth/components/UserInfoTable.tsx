import type { User } from '../models/user'
import { KeyValueTable } from '@/components'

interface UserInfoTableProps {
  user: User
}

const UserInfoTable = ({ user }: UserInfoTableProps) => {
  return (
    <KeyValueTable
      data={[
        ['Usuario', user.username, 'Id', user.id, 'Correo', user.email],
        ['Nombres', user.firstName, 'Apellidos', user.lastName],
      ]}
    />
  )
}

export default UserInfoTable
