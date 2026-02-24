import { buildProfileFullName } from '../utils'
import type { Profile } from '../../models/profile'
import type { BreadcrumbSpec } from '@/components'
import { GroupsIcon, PersonIcon } from '@/components'

export const profilesBreadcrumb: BreadcrumbSpec = {
  title: 'Pérfiles',
  icon: () => <GroupsIcon />,
  pathname: '/profiles',
}

export const buildProfileBreadcrumb = (profile: Profile): BreadcrumbSpec => ({
  title: buildProfileFullName(profile),
  icon: () => <PersonIcon />,
  pathname: '/profiles/$id',
  params: { id: profile.id.toString() },
})
