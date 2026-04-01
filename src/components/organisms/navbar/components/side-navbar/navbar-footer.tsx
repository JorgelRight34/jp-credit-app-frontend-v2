import CurrentUserPicCard from './current-user-pic-card'
import { Icon, MoreVertIcon } from '@/components/atoms'
import { getFirstAndLastName } from '@/lib/utils'
import { PropsWithUser } from '@/models/user'
import NavbarAppSettingsTrigger from '../navbar-app-settings/navbar-app-settings'

interface NavbarFooterProps extends PropsWithUser {}

const NavbarFooter = ({ user }: NavbarFooterProps) => {
  return (
    <div className="bg-active-transparent flex w-full flex-col rounded-lg border p-2 shadow-sm">
      <div className="text-muted !flex w-full items-center">
        <CurrentUserPicCard user={user} className="mr-2" />
        <span className="mr-auto flex flex-col">
          <span className="truncate">{getFirstAndLastName(user)}</span>
        </span>
        <NavbarAppSettingsTrigger>
          <Icon icon={MoreVertIcon} />
        </NavbarAppSettingsTrigger>
      </div>
    </div>
  )
}
export default NavbarFooter
