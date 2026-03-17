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
import {
  ModalTrigger,
  ModalTriggerProps,
  ModalTriggerRef,
} from '@/components/organisms/modal'
import { PropsWithChildren, useRef } from 'react'

const NavbarAppSettingsTrigger = ({
  children,
  ...props
}: PropsWithChildren & Partial<ModalTriggerProps>) => {
  const ref = useRef<ModalTriggerRef>(null)

  return (
    <ModalTrigger
      title={<Icon icon={SettingsIcon}>Opciones</Icon>}
      className="w-[80dvw] md:!w-[25dvw]"
      trigger={children}
      ref={ref}
      {...props}
    >
      <span className="flex flex-col space-y-6 py-3">
        <span>
          <ThemeTogglerMenuItem />
        </span>
        <Link to="/reset-password" onClick={() => ref.current?.hide()}>
          <MenuItem>
            <Icon icon={KeyIcon}>Resetear contraseña</Icon>
          </MenuItem>
        </Link>
        <Link to="/logout" onClick={() => ref.current?.hide()}>
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
