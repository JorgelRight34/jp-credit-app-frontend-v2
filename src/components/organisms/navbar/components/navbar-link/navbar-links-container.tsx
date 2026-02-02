import clsx from 'clsx'
import NavbarLink from './navbar-link'
import type { NavbarLinkProps } from './navbar-link'
import type { NavItem } from '../../models/navItem'

type NavbarLinksContainerProps = React.HtmlHTMLAttributes<HTMLDivElement> &
  Omit<NavbarLinkProps, 'option' | 'onExpand'> & {
    options: Array<NavItem>
    onExpand: (option: NavItem) => void
  }

const NavbarLinksContainer = ({
  className,
  options,
  children,
  onExpand,
  ...props
}: NavbarLinksContainerProps) => {
  return (
    <div
      className={clsx('fade-in flex-1 overflow-y-auto', className)}
      style={{
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {children}
      <div className="flex flex-col gap-5 px-3 pt-3">
        {options.map((option, index) => (
          <NavbarLink
            key={index}
            onExpand={() => onExpand(option)}
            option={option}
            search={option.search}
            {...props}
          />
        ))}
      </div>
    </div>
  )
}

export default NavbarLinksContainer
