import clsx from 'clsx'
import type { NavbarLinkProps } from './navbar-link'

const NavbarLinkContainer = ({
  option,
  children,
  isActive,
  className,
  ...props
}: NavbarLinkProps & { isActive: boolean }) => {
  return (
    <div
      className="nav-link-container position-relative"
      role="link"
      tabIndex={0}
      {...props}
    >
      <div
        className={clsx('nav-link-option p-0 hover:!shadow-sm', className, {
          'nav-link-active text-white shadow-sm': isActive,
          'text-muted': !isActive,
        })}
      >
        {children}
      </div>
    </div>
  )
}

export default NavbarLinkContainer
