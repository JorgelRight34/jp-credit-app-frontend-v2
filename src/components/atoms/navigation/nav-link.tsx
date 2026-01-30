import clsx from 'clsx'
import { useMemo } from 'react'
import Link from './link'
import type { LinkProps } from './link'
import { usePathname } from '@/hooks/usePathname'

type NavLinkProps = Omit<LinkProps, 'className'> & {
  className: (({ isActive }: { isActive: boolean }) => string) | string
}

const NavLink = ({ to, children, className }: NavLinkProps) => {
  const pathname = usePathname()

  const isActive = useMemo(
    () => !!(to && pathname.startsWith(to.toString())),
    [pathname, to],
  )

  return (
    <Link
      to={to}
      className={clsx(
        'link-reset !no-underline',
        typeof className === 'function' ? className({ isActive }) : className,
      )}
    >
      {children}
    </Link>
  )
}

export default NavLink
