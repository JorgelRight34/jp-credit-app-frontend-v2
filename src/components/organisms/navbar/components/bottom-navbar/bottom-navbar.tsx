import '../_navbar.css'
import clsx from 'clsx'
import {
  loansNavItem,
  profileNavItem,
  transactionsNavItem,
} from '../../lib/navItems'
import BottomNavbarDrawer from './bottom-navbar-drawer'
import type { NavItem } from '../../models/navItem'
import { HomeIcon, Icon, NavLink } from '@/components/atoms'

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
  return (
    <div className="border-top flex h-full w-full items-center justify-between bg-white p-2 px-3 lg:hidden">
      {options.map((option, index) => (
        <NavLink
          key={index}
          className={({ isActive }) =>
            clsx(
              {
                'text-accent-important': isActive,
                '!text-gray-500': !isActive,
              },
              'bg-white p-2',
            )
          }
          to={option.route}
        >
          <Icon icon={option.icon} style={{ height: '2rem' }} />
        </NavLink>
      ))}
      <BottomNavbarDrawer />
    </div>
  )
}

export default BottomNavbar
