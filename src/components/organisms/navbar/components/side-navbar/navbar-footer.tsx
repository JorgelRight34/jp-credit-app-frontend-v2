import clsx from 'clsx'
import CurrentUserPicCard from './current-user-pic-card'
import {
  DarkModeIcon,
  Icon,
  LightModeIcon,
  LogoutIcon,
  MoreVertIcon,
  SettingsIcon,
} from '@/components/atoms'
import { useAuth } from '@/contexts/auth-context'
import { primaryColor } from '@/lib/constants/constants'
import { getFirstAndLastName } from '@/lib/utils/utils'
import { MenuItem, useTheme } from '@/components/molecules'
import { ModalTrigger } from '@/components/organisms/modal'

interface NavbarFooterProps {
  className?: string
}

const NavbarFooter = ({ className }: NavbarFooterProps) => {
  const { user } = useAuth()

  return (
    <div className={clsx(`flex w-full flex-col rounded border p-2`, className)}>
      <div className={'nav-link !flex w-full items-center text-muted'}>
        <CurrentUserPicCard
          className="mr-2"
          color={primaryColor}
          background="#fff"
        />
        <span className="mr-auto flex flex-col">
          <span>{user && getFirstAndLastName(user)}</span>
        </span>
        <MenuTrigger />
      </div>
    </div>
  )
}

const MenuTrigger = () => {
  const { logout } = useAuth()

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
        <span>
          <MenuItem onClick={logout}>
            <Icon icon={LogoutIcon}>Cerrar sesion</Icon>
          </MenuItem>
        </span>
      </span>
    </ModalTrigger>
  )
}

const ThemeTogglerMenuItem = () => {
  const { theme, toggle } = useTheme()

  return (
    <MenuItem onClick={toggle}>
      {theme === 'light' ? (
        <Icon icon={LightModeIcon}>Modo claro</Icon>
      ) : (
        <Icon icon={DarkModeIcon}>Modo obscuro</Icon>
      )}
    </MenuItem>
  )
}

export default NavbarFooter
