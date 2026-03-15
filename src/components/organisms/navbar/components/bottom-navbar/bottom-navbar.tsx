import '../_navbar.css'
import {
  loansNavItem,
  profileNavItem,
  transactionsNavItem,
} from '../../lib/navItems'
import BottomNavbarDrawer from './bottom-navbar-drawer'
import type { NavItem } from '../../models/navItem'
import { HomeIcon, Icon, NavLink } from '@/components/atoms'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { SMALL_SCREEN_BREAKPOINT } from '@/lib/utils'

const options: Array<NavItem> = [
  loansNavItem,
  profileNavItem,
  {
    name: 'Home',
    icon: HomeIcon,
    route: '/',
  },
  transactionsNavItem,
]

const BottomNavbar = () => {
  const isSmall = useMediaQuery(SMALL_SCREEN_BREAKPOINT)

  if (!isSmall) return null

  return (
    <div className="border-t flex h-full w-full items-center justify-between bg-surface p-2 px-3 lg:hidden">
      {options.map((option, index) => (
        <NavLink key={index} activeOptions={{ exact: true }} to={option.route}>
          <Icon icon={option.icon} style={{ height: '2rem' }} />
        </NavLink>
      ))}
      <BottomNavbarDrawer />
    </div>
  )
}

export default BottomNavbar
