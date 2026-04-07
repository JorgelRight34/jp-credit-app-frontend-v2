import '../_navbar.css'
import { Activity, startTransition, useMemo, useState } from 'react'
import {
  accessControlNavItem,
  accountStatusNavItem,
  armotizationsNavItem,
  collateralsNavItem,
  financesNavItem,
  followUpsNavItem,
  loansNavItem,
  notesNavItem,
  profileNavItem,
  projectsNavItem,
  systemNavItem,
  transactionsNavItem,
} from '../../lib/navItems'
import NavbarLinksContainer from '../navbar-link/navbar-links-container'
import NavbarFooter from './navbar-footer'
import type { NavItem } from '../../models/navItem'
import { ArrowBackIcon, Icon, Link } from '@/components/atoms'
import { PropsWithUser } from '@/models/user'
import NavbarCard from './navbar-card'
import NavbarBody from './navbar-body'

const options = [
  profileNavItem,
  accountStatusNavItem,
  accessControlNavItem,
  loansNavItem,
  transactionsNavItem,
  financesNavItem,
  collateralsNavItem,
  projectsNavItem,
  followUpsNavItem,
  notesNavItem,
  systemNavItem,
  armotizationsNavItem,
]

const Navbar = ({ user, header }: PropsWithUser<{ header: string }>) => {
  return (
    <div className="side-navbar rounded-bottom-lg bg-surface relative flex h-full w-full flex-col border-r shadow-sm">
      <div className="flex-shrink-0 p-2">
        <Link to="/">
          <NavbarCard
            className="text-primary"
            image={
              <img className="brand small-logo h-full w-full" alt="logo" />
            }
            text={header}
          />
        </Link>
      </div>
      <NavbarBody options={options} />
      <div className="hidden w-full flex-shrink-0 p-2 md:block">
        <NavbarFooter user={user} />
      </div>
    </div>
  )
}

export default Navbar
