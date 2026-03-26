import { createFileRoute } from '@tanstack/react-router'
import { getProfileFn } from '..'
import { createProfileKey } from '@/features/profiles/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { EditProfileFormPage } from '@/features/profiles'
import { getModulePermissionsBeforeLoad } from '../../../route'
import { profilesPermissionProvider } from '@/features/profiles/lib/config/permissionProvider'

export const Route = createFileRoute('/(main)/(modules)/profiles/$id/edit/')({
  beforeLoad: getModulePermissionsBeforeLoad(profilesPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: profile } = useSuspenseData({
    key: createProfileKey(id),
    loader: () => getProfileFn(+id),
  })

  return <EditProfileFormPage profile={profile} />
}
