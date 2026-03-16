import '../_navbar.css'
import { loansNavItem, transactionsNavItem } from '../../lib/navItems'
import BottomNavbarDrawer from './bottom-navbar-drawer'
import type { NavItem } from '../../models/navItem'
import { HomeIcon, Icon, NavLink } from '@/components/atoms'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { SMALL_SCREEN_BREAKPOINT } from '@/lib/utils'
import CurrentUserPicCard from '../side-navbar/current-user-pic-card'
import { PropsWithUser } from '@/models/user'
import NavbarAppSettingsTrigger from '../navbar-app-settings/navbar-app-settings'

const options: Array<NavItem> = [
  loansNavItem,
  {
    name: 'Home',
    icon: HomeIcon,
    route: '/',
  },
  transactionsNavItem,
]

const BottomNavbar = ({ user }: PropsWithUser) => {
  const isSmall = useMediaQuery(SMALL_SCREEN_BREAKPOINT)

  if (!isSmall) return null

  return (
    <div className="border-t flex h-full w-full items-center justify-between bg-surface p-2 px-3 lg:hidden">
      <BottomNavbarDrawer user={user} />
      {options.map((option, index) => (
        <NavLink key={index} activeOptions={{ exact: true }} to={option.route}>
          <Icon icon={option.icon} style={{ height: '2rem' }} />
        </NavLink>
      ))}
      <NavbarAppSettingsTrigger triggerClassName="!flex">
        <CurrentUserPicCard
          user={user}
          style={{ height: '2rem', width: '2rem' }}
        />
      </NavbarAppSettingsTrigger>
    </div>
  )
}

export default BottomNavbar
