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
  onClick?: () => void
  onExpand?: () => void
}

const NavbarLink = ({
  option,
  className,
  activeOptions,
  onClick,
  onExpand,
  ...linkProps
}: NavbarLinkProps) => {
  return (
    <Link to={option.route} className="block" {...linkProps}>
      {({ isActive }) => (
        <NavbarLinkContainer
          option={option}
          onClick={onClick}
          className={className}
          isActive={isActive}
        >
          <span
            className={clsx('flex items-center p-2', {
              'text-active font-medium': isActive,
            })}
          >
            <div
              className={clsx('flex min-w-0 flex-1 items-center', {
                'text-link-active': isActive,
              })}
            >
              <div className="flex-1 truncate">
                <Icon
                  icon={option.icon}
                  label={option.name}
                  labelClassName="truncate flex-1 truncate min-w-0"
                />
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
