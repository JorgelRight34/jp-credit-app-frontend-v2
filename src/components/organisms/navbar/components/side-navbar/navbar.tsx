import '../_navbar.css'
import { useState } from 'react'
import clsx from 'clsx'
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
  reportsNavItem,
  settingsNavItem,
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
  armotizationsNavItem,
  settingsNavItem,
]

interface NavbarProps {
  onSelect?: (link: NavItem) => void
}

const Navbar = ({ onSelect }: NavbarProps) => {
  const [activeNav, setActiveNav] = useState<NavItem | null>(null)
  const [searchResults, setSearchResults] = useState<Array<NavItem>>([])

  const handleOnSelect = (option: NavItem) => {
    setActiveNav(option)
    onSelect?.(option)
  }

  return (
    <div className="side-navbar rounded-bottom-lg relative flex h-full w-full flex-col bg-white shadow-sm">
      <div className="border-bottom flex-shrink-0">
        <NavbarHeader
          src="/horizontal-logo.png?url"
          alt="logo"
          className="mb-0"
        />
      </div>
      <div className="flex-shrink-0 p-3">
        <NavbarSearch
          className="bg-active-transparent"
          options={options}
          onSearch={(results: Array<NavItem>) => {
            if (results.length > 0) {
              setSearchResults(results)
            }
          }}
        />
      </div>
      <NavbarLinksContainer
        className={clsx({ hidden: activeNav?.children?.length })}
        options={searchResults.length > 0 ? searchResults : options}
        onExpand={handleOnSelect}
      />
      <NavbarLinksContainer
        className={clsx({ hidden: !activeNav?.children?.length })}
        options={activeNav?.children || []}
        onExpand={handleOnSelect}
        activeOptions={{ includeSearch: true }}
      >
        {/* imrpove this ui */}
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
      <div className="w-full flex-shrink-0 p-3">
        <NavbarFooter className="bg-active-transparent shadow-sm" />
      </div>
    </div>
  )
}

export default Navbar
