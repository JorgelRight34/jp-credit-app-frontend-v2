import clsx from 'clsx'
import '../_navbar.css'
import NavbarLinkContainer from './navbar-link-container'
import NavbarLinkExpandTrigger from './navbar-link-expand-trigger'
import type { NavItem } from '../../models/navItem'
import type { ReactNode } from 'react'
import type { LinkProps } from '@/components/atoms'
import { Icon, Link } from '@/components/atoms'

export interface NavbarLinkProps extends Partial<LinkProps> {
  children?: ReactNode
  option: NavItem
  className?: string
  onExpand?: () => void
}

const NavbarLink = ({
  option,
  className,
  activeOptions,
  onExpand,
  ...linkProps
}: NavbarLinkProps) => {
  return (
    <Link
      to={option.route}
      className="block"
      activeOptions={option.activeOptions ?? activeOptions}
      {...linkProps}
    >
      {({ isActive }) => (
        <NavbarLinkContainer
          option={option}
          className={className}
          isActive={isActive}
        >
          <span
            className={clsx(
              'bg-surface flex items-center p-2',
              isActive && 'text-active bg-active-transparent font-medium',
            )}
            onClick={onExpand} // Expand after navigation
          >
            <div
              className={clsx(
                'flex min-w-0 flex-1 items-center',
                isActive && 'text-link-active',
              )}
            >
              <div className="flex-1 truncate">
                <Icon
                  icon={option.icon}
                  className="min-w-0 flex-1 !justify-start"
                >
                  <div className="truncate">{option.name}</div>
                </Icon>
              </div>
            </div>
            <NavbarLinkExpandTrigger option={option} onExpand={onExpand} />
          </span>
        </NavbarLinkContainer>
      )}
    </Link>
  )
}

export default NavbarLink
