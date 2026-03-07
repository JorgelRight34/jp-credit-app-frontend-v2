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
import NavbarHeader from './navbar-header'
import NavbarFooter from './navbar-footer'
import NavbarSearch from './navbar-search'
import type { NavItem } from '../../models/navItem'
import { ArrowBackIcon, Icon } from '@/components/atoms'

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
        <NavbarHeader
          src="/horizontal-logo-light.svg?url"
          alt="logo"
          className="mb-0"
        />
      </div>
      <NavbarBody onSelect={onSelect} />
      <div className="w-full flex-shrink-0 p-3">
        <NavbarFooter className="bg-active-transparent shadow-sm" />
      </div>
    </div>
  )
}

const NavbarBody = ({ onSelect }: NavbarProps) => {
  const [activeNav, setActiveNav] = useState<NavItem | null>(null)
  const [searchResults, setSearchResults] = useState<Array<NavItem>>([])
  const hasActiveNavChildren = useMemo(
    () =>
      searchResults.length === 0 &&
      activeNav?.children &&
      activeNav.children.length > 0,
    [activeNav, searchResults],
  )

  const handleOnSelect = (option: NavItem) => {
    setActiveNav(option)
    onSelect?.(option)
  }

  return (
    <>
      <div className="flex-shrink-0 p-3">
        <NavbarSearch
          className="bg-active-transparent"
          options={options}
          onChange={setSearchResults}
        />
      </div>
      <Activity mode={!hasActiveNavChildren ? 'visible' : 'hidden'}>
        <NavbarLinksContainer
          options={searchResults.length > 0 ? searchResults : options}
          onExpand={handleOnSelect}
        />
      </Activity>
      <Activity mode={hasActiveNavChildren ? 'visible' : 'hidden'}>
        <NavbarLinksContainer
          options={activeNav?.children ?? []}
          onExpand={handleOnSelect}
          activeOptions={{ includeSearch: true }}
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
                className="text-sm text-link-active"
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
