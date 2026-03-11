import '../_navbar.css'
import { Activity, useMemo, useState } from 'react'
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
import { ArrowBackIcon, Icon, Image, Link } from '@/components/atoms'
import { useTheme } from '@/components/molecules'

const options = [
  profileNavItem,
  accessControlNavItem,
  accountStatusNavItem,
  collateralsNavItem,
  transactionsNavItem,
  notesNavItem,
  loansNavItem,
  followUpsNavItem,
  financesNavItem,
  reportsNavItem,
  projectsNavItem,
  armotizationsNavItem,
]

interface NavbarProps {
  onSelect?: (link: NavItem) => void
}

const Navbar = ({ onSelect }: NavbarProps) => {
  return (
    <div className="side-navbar rounded-bottom-lg relative flex h-full w-full flex-col bg-surface border-r shadow-sm">
      <div className="border-b flex-shrink-0">
        <NavbarHeader />
      </div>
      <NavbarBody onSelect={onSelect} />
      <div className="w-full flex-shrink-0 p-3 border-t">
        <NavbarFooter className="bg-active-transparent shadow-sm" />
      </div>
    </div>
  )
}

const NavbarHeader = () => {
  const { theme } = useTheme()

  return (
    <Link to="/">
      <div className="flex items-center gap-6 p-3">
        <Image
          className="brand h-12 object-fit"
          src={
            theme === 'light'
              ? '/horizontal-logo-light.svg?url'
              : '/horizontal-logo-dark.svg?url'
          }
          alt="logo"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </Link>
  )
}

const NavbarBody = ({ onSelect }: NavbarProps) => {
  const [activeNav, setActiveNav] = useState<NavItem | null>(null)
  const hasActiveNavChildren = useMemo(
    () => activeNav?.children && activeNav.children.length > 0,
    [activeNav],
  )

  const handleOnSelect = (option: NavItem) => {
    setActiveNav(option)
    onSelect?.(option)
  }

  return (
    <>
      <Activity mode={!hasActiveNavChildren ? 'visible' : 'hidden'}>
        <NavbarLinksContainer options={options} onExpand={handleOnSelect} />
      </Activity>
      <Activity mode={hasActiveNavChildren ? 'visible' : 'hidden'}>
        <NavbarLinksContainer
          options={activeNav?.children ?? []}
          onExpand={handleOnSelect}
          activeOptions={{ includeSearch: true, exact: true }}
        >
          <div className="flex justify-between border-b border-t bg-active-transparent p-3 shadow-sm">
            <div className="border-left-accent">
              <Icon
                className="text-accent-secondary cursor-pointer"
                icon={ArrowBackIcon}
                onClick={() => setActiveNav(null)}
              />
            </div>
            <div className="flex items-center">
              <Icon
                className="text-sm text-accent-secondary"
                iconClassName="text-accent-secondary"
                orientation="right"
                icon={activeNav?.icon}
              >
                /&nbsp;
                {activeNav?.name}
              </Icon>
            </div>
          </div>
        </NavbarLinksContainer>
      </Activity>
    </>
  )
}

export default Navbar
