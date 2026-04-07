import { Activity } from 'react'
import { NavItem } from '../../models/navItem'
import NavbarLinksContainer from '../navbar-link/navbar-links-container'
import { ArrowBackIcon, Icon } from '@/components/atoms'
import { useNavStack } from '../../hooks/useNavStack'

const NavbarBody = ({ options }: { options: Array<NavItem> }) => {
  const [activeNav, goDeeper, goBack] = useNavStack()
  const hasActiveNavChildren = activeNav?.children

  return (
    <>
      <Activity mode={!hasActiveNavChildren ? 'visible' : 'hidden'}>
        <NavbarLinksContainer options={options} onExpand={goDeeper} />
      </Activity>
      <Activity mode={hasActiveNavChildren ? 'visible' : 'hidden'}>
        <NavbarLinksContainer
          options={activeNav?.children}
          activeOptions={{ includeSearch: true, exact: true }}
          onExpand={goDeeper}
        >
          <div className="text-primary bg-surface-subtle-transparent flex justify-between border-t border-b p-3 shadow-sm">
            <div className="border-left-accent">
              <Icon
                className="text-accent-secondary cursor-pointer"
                icon={ArrowBackIcon}
                onClick={goBack}
              />
            </div>
            {activeNav?.name}
          </div>
        </NavbarLinksContainer>
      </Activity>
    </>
  )
}

export default NavbarBody
