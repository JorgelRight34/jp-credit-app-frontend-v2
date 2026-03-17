import clsx from 'clsx'
import Link from './link'
import type { LinkProps } from './link'
import { ReactNode } from 'react'

type NavLinkProps = LinkProps & {
  children: ReactNode
  className?: string
}

const NavLink = ({ to, children, className, ...props }: NavLinkProps) => {
  return (
    <Link to={to} {...props}>
      {({ isActive }) => (
        <span
          className={clsx(
            'text-secondary',
            className,
            isActive && 'text-active font-medium',
          )}
        >
          {children}
        </span>
      )}
    </Link>
  )
}

export default NavLink
