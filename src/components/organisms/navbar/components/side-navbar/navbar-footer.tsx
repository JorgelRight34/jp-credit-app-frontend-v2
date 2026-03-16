import clsx from 'clsx'
import CurrentUserPicCard from './current-user-pic-card'
import { Icon, MoreVertIcon } from '@/components/atoms'
import { useAuth } from '@/contexts/auth-context'
import { getFirstAndLastName } from '@/lib/utils'
import { PropsWithUser } from '@/models/user'
import NavbarAppSettingsTrigger from '../navbar-app-settings/navbar-app-settings'

interface NavbarFooterProps extends PropsWithUser {
  className?: string
}

const NavbarFooter = ({ className }: NavbarFooterProps) => {
  const { user } = useAuth()

  return (
    <div
      className={clsx(
        `flex w-full flex-col rounded border bg-active-transparent p-2`,
        className,
      )}
    >
      <div className="!flex w-full items-center text-muted">
        <CurrentUserPicCard user={user} className="mr-2" />
        <span className="mr-auto flex flex-col">
          <span>{getFirstAndLastName(user)}</span>
        </span>
        <NavbarAppSettingsTrigger>
          <Icon icon={MoreVertIcon} />
        </NavbarAppSettingsTrigger>
      </div>
    </div>
  )
}
export default NavbarFooter
