import { buildProfileKey } from '@/features/profiles/lib/query-keys'
import { createFileRoute } from '@tanstack/react-router'
import { getProfileFn } from '..'
import { requireModulePermissionToDelete } from '../../../route'
import { profilesPermissionProvider } from '@/features/profiles/lib/config/permissionProvider'
import { DeleteProfilePage } from '@/features/profiles'
import { buildDeleteHead } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/profiles/$id/delete/')({
  beforeLoad: requireModulePermissionToDelete(profilesPermissionProvider),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildProfileKey(+id),
      queryFn: () => getProfileFn(id),
    }),
  head: ({ loaderData }) => buildDeleteHead(loaderData, (l) => l.firstName),
  component: RouteComponent,
})

function RouteComponent() {
  const profile = Route.useLoaderData()

  return <DeleteProfilePage profile={profile} />
}
