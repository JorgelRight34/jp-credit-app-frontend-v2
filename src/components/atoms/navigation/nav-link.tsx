import clsx from 'clsx'
import Link from './link'
import type { LinkProps } from './link'
import { ReactNode } from 'react'

type NavLinkProps = Omit<LinkProps, 'className'> & {
  children: ReactNode
}

const NavLink = ({ to, children, ...props }: NavLinkProps) => {
  return (
    <Link to={to} {...props}>
      {({ isActive }) => (
        <span
          className={clsx('text-secondary', {
            'text-active font-medium': isActive,
          })}
        >
          {children}
        </span>
      )}
    </Link>
  )
}

export default NavLink
