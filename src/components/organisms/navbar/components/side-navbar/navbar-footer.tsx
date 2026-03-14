import clsx from 'clsx'
import CurrentUserPicCard from './current-user-pic-card'
import {
  DarkModeIcon,
  Icon,
  KeyIcon,
  LightModeIcon,
  Link,
  LogoutIcon,
  MoreVertIcon,
  SettingsIcon,
} from '@/components/atoms'
import { useAuth } from '@/contexts/auth-context'
import { MenuItem, useTheme } from '@/components/molecules'
import { ModalTrigger } from '@/components/organisms/modal'
import { getFirstAndLastName } from '@/lib/utils'

interface NavbarFooterProps {
  className?: string
}

const NavbarFooter = ({ className }: NavbarFooterProps) => {
  const { user } = useAuth()

  return (
    <div
      className={clsx(
        `flex w-full flex-col rounded border bg-active-transparent p-2`,
        className,
      )}
    >
      <div className="!flex w-full items-center text-muted">
        <CurrentUserPicCard className="mr-2" />
        <span className="mr-auto flex flex-col">
          <span>{user && getFirstAndLastName(user)}</span>
        </span>
        <MenuTrigger />
      </div>
    </div>
  )
}

const MenuTrigger = () => {
  return (
    <ModalTrigger
      title={<Icon icon={SettingsIcon}>Opciones</Icon>}
      width="25dvw"
      trigger={<Icon icon={MoreVertIcon} />}
    >
      <span className="flex flex-col space-y-6 py-3">
        <span>
          <ThemeTogglerMenuItem />
        </span>
        <Link to="/reset-password">
          <MenuItem>
            <Icon icon={KeyIcon}>Resetear contraseña</Icon>
          </MenuItem>
        </Link>
        <Link to="/logout">
          <MenuItem>
            <Icon icon={LogoutIcon}>Cerrar sesión</Icon>
          </MenuItem>
        </Link>
      </span>
    </ModalTrigger>
  )
}

const ThemeTogglerMenuItem = () => {
  const { theme, toggle } = useTheme()

  return (
    <MenuItem onClick={toggle}>
      {theme === 'light' ? (
        <Icon icon={DarkModeIcon}>Modo obscuro</Icon>
      ) : (
        <Icon icon={LightModeIcon}>Modo claro</Icon>
      )}
    </MenuItem>
  )
}

export default NavbarFooter
