import { buildProfileKey } from '@/features/profiles/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getProfileFn } from '..'
import { getModulePermissionsBeforeLoad } from '../../../route'
import { profilesPermissionProvider } from '@/features/profiles/lib/config/permissionProvider'
import { DeleteProfilePage } from '@/features/profiles'

export const Route = createFileRoute('/(main)/(modules)/profiles/$id/delete/')({
  beforeLoad: getModulePermissionsBeforeLoad(profilesPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: profile } = useSuspenseData({
    key: buildProfileKey(id),
    loader: () => getProfileFn(+id),
  })

  return <DeleteProfilePage profile={profile} />
}
