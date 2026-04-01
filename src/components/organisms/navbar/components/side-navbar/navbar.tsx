import '../_navbar.css'
import { Activity, ReactNode, useMemo, useState } from 'react'
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
  reportsNavItem,
  transactionsNavItem,
} from '../../lib/navItems'
import NavbarLinksContainer from '../navbar-link/navbar-links-container'
import NavbarFooter from './navbar-footer'
import type { NavItem } from '../../models/navItem'
import { ArrowBackIcon, Icon } from '@/components/atoms'
import { PropsWithUser } from '@/models/user'

const options = [
  // Identity & Access
  profileNavItem,
  accountStatusNavItem,
  accessControlNavItem,

  // Core Financial Activity
  loansNavItem,
  transactionsNavItem,
  financesNavItem,

  // Supporting Details
  collateralsNavItem,
  projectsNavItem,

  // Relationship & Follow-up
  followUpsNavItem,
  notesNavItem,

  // Reporting
  reportsNavItem,
  armotizationsNavItem,
]

const Navbar = ({ header, user }: PropsWithUser<{ header?: ReactNode }>) => {
  return (
    <div className="side-navbar rounded-bottom-lg bg-surface relative flex h-full w-full flex-col border-r shadow-sm">
      <div className="flex-shrink-0 border-b">
        <div className="flex items-center p-2 py-3">{header}</div>
      </div>
      <NavbarBody />
      <div className="hidden w-full flex-shrink-0 p-2 md:block">
        <NavbarFooter user={user} />
      </div>
    </div>
  )
}

const NavbarBody = () => {
  const [activeNav, setActiveNav] = useState<NavItem | null>(null)
  const hasActiveNavChildren = useMemo(
    () => activeNav?.children && activeNav.children.length > 0,
    [activeNav],
  )

  return (
    <>
      <Activity mode={!hasActiveNavChildren ? 'visible' : 'hidden'}>
        <NavbarLinksContainer options={options} onExpand={setActiveNav} />
      </Activity>
      <Activity mode={hasActiveNavChildren ? 'visible' : 'hidden'}>
        <NavbarLinksContainer
          options={activeNav?.children ?? []}
          activeOptions={{ includeSearch: true, exact: true }}
        >
          <div className="text-primary bg-surface-subtle-transparent flex justify-between border-t border-b p-3 shadow-sm">
            <div className="border-left-accent">
              <Icon
                className="text-accent-secondary cursor-pointer"
                icon={ArrowBackIcon}
                onClick={() => setActiveNav(null)}
              />
            </div>
            {activeNav?.name}
          </div>
        </NavbarLinksContainer>
      </Activity>
    </>
  )
}

export default Navbar
