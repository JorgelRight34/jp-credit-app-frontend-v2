import type { Role } from '../../models/role'
import type { User } from '../../models/user'
import type { BreadcrumbSpec } from '@/components'
import {
  AdminPanelSettingsIcon,
  BadgeIcon,
  LockIcon,
  PersonIcon,
} from '@/components'

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

export const buildUserBreadcrumb = (user: User): BreadcrumbSpec => ({
  icon: PersonIcon,
  title: user.username,
  pathname: '/access-control/users/$username',
  params: { username: user.username },
})

export const buildRoleBreadcrumb = (role: Role): BreadcrumbSpec => ({
  title: role.name,
  icon: BadgeIcon,
  pathname: '/access-control/roles/$id',
  params: { id: role.id.toString() },
})
