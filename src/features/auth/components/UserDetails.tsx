import UserInfoTable from './UserInfoTable'
import type { User } from '../models/user'

interface UserDetailsProps {
  user: User
}

const UserDetails = ({ user }: UserDetailsProps) => {
  return (
    <div className="flex p-3">
      <UserInfoTable user={user} />
    </div>
  )
}

export default UserDetails
