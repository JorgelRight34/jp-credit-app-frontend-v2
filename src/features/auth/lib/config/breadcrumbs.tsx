import type { BreadcrumbSpec } from '@/components'
import { AdminPanelSettingsIcon, LockIcon, PersonIcon } from '@/components'

export const accessControlBreadcrumb: BreadcrumbSpec = {
  icon: () => <LockIcon />,
  title: 'Accesos',
  pathname: '/access-control',
}

export const rolesModuleBreadcrumb: BreadcrumbSpec = {
  icon: () => <AdminPanelSettingsIcon />,
  title: 'Roles',
  pathname: '/access-control',
  search: { tab: 'roles' },
}

export const usersModuleBreadcrumb: BreadcrumbSpec = {
  icon: () => <PersonIcon />,
  title: 'Usuarios',
  pathname: '/access-control',
  search: { tab: 'users' },
}
