import CurrentUserPicCard from './current-user-pic-card'
import { Icon, MoreVertIcon } from '@/components/atoms'
import { getFirstAndLastName } from '@/lib/utils'
import { PropsWithUser } from '@/models/user'
import NavbarAppSettingsTrigger from '../navbar-app-settings/navbar-app-settings'
import NavbarCard from './navbar-card'

interface NavbarFooterProps extends PropsWithUser {}

const NavbarFooter = ({ user }: NavbarFooterProps) => {
  return (
    <NavbarCard
      image={<CurrentUserPicCard user={user} />}
      text={getFirstAndLastName(user)}
      className="text-muted"
      options={
        <NavbarAppSettingsTrigger>
          <Icon icon={MoreVertIcon} />
        </NavbarAppSettingsTrigger>
      }
    />
  )
}
export default NavbarFooter
