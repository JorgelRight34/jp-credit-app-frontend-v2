import '../_navbar.css'
import BottomNavbarDrawer from './bottom-navbar-drawer'
import {
  AccountBalanceIcon,
  HomeIcon,
  Icon,
  LoanIcon,
  NavLink,
  Paragraph,
} from '@/components/atoms'
import { useWindowBreakpoint } from '@/hooks/useWindowBreakpoint'
import { SMALL_SCREEN_BREAKPOINT } from '@/lib/utils'
import CurrentUserPicCard from '../side-navbar/current-user-pic-card'
import { PropsWithUser } from '@/models/user'
import NavbarAppSettingsTrigger from '../navbar-app-settings/navbar-app-settings'
import { PropsWithChildren } from 'react'

const BottomNavbar = ({ user }: PropsWithUser) => {
  const isSmall = useWindowBreakpoint(SMALL_SCREEN_BREAKPOINT)
  const style = { height: '1.5rem' }

  if (!isSmall) return null

  return (
    <div className="bg-surface flex h-full w-full items-center justify-between border-t p-2 px-3 lg:hidden">
      <NavLink activeOptions={{ exact: true }} to="/">
        <NavItem>
          <Icon icon={HomeIcon} style={style} />
          <NavItemParagraph>Inicio</NavItemParagraph>
        </NavItem>
      </NavLink>
      <NavItem>
        <BottomNavbarDrawer user={user} style={style} />
        <NavItemParagraph>Buscar</NavItemParagraph>
      </NavItem>
      <NavLink activeOptions={{ exact: true }} to="/loans">
        <NavItem>
          <Icon icon={LoanIcon} style={style} />
          <NavItemParagraph>Préstamos</NavItemParagraph>
        </NavItem>
      </NavLink>
      <NavLink activeOptions={{ exact: true }} to="/account-statements">
        <NavItem>
          <Icon icon={AccountBalanceIcon} style={style} />
          <NavItemParagraph>Cuentas</NavItemParagraph>
        </NavItem>
      </NavLink>
      <NavbarAppSettingsTrigger triggerClassName="!flex flex-col items-center gap-1">
        <CurrentUserPicCard user={user} style={style} />
        <NavItemParagraph>{user.firstName.split(' ')[0]}</NavItemParagraph>
      </NavbarAppSettingsTrigger>
    </div>
  )
}

const NavItem = ({
  children,
  className = '',
}: PropsWithChildren<{ className?: string }>) => (
  <span className={`text-muted flex flex-col items-center gap-1 ${className}`}>
    {children}
  </span>
)

const NavItemParagraph = ({ children }: PropsWithChildren) => (
  <Paragraph className="text-xs">{children}</Paragraph>
)

export default BottomNavbar
