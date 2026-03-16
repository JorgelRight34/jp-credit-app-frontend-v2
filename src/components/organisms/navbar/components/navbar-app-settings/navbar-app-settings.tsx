import {
  DarkModeIcon,
  Icon,
  KeyIcon,
  LightModeIcon,
  Link,
  LogoutIcon,
  SettingsIcon,
} from '@/components/atoms'
import { MenuItem, useTheme } from '@/components/molecules'
import { ModalTrigger, ModalTriggerProps } from '@/components/organisms/modal'
import { PropsWithChildren } from 'react'

const NavbarAppSettingsTrigger = ({
  children,
  ...props
}: PropsWithChildren & Partial<ModalTriggerProps>) => {
  return (
    <ModalTrigger
      title={<Icon icon={SettingsIcon}>Opciones</Icon>}
      width="25dvw"
      trigger={children}
      {...props}
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

export default NavbarAppSettingsTrigger
