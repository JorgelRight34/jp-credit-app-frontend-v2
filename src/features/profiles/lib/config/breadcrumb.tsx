import { getProfileFullName } from '../utils'
import type { Profile } from '../../models/profile'
import type { BreadcrumbSpec } from '@/components'
import { GroupsIcon, PersonIcon } from '@/components'

export const profilesBreadcrumb: BreadcrumbSpec = {
  title: 'Pérfiles',
  icon: () => <GroupsIcon />,
  pathname: '/profiles',
}

export const createProfileBreadcrumb = (profile: Profile): BreadcrumbSpec => ({
  title: getProfileFullName(profile),
  icon: () => <PersonIcon />,
  pathname: '/profiles/$id',
  params: { id: profile.id.toString() },
})
