import { createFileRoute } from '@tanstack/react-router'
import { getProfileFn } from '..'
import { buildProfileKey } from '@/features/profiles/lib/query-keys'
import {
  EditProfilePage,
  profilesPermissionProvider,
} from '@/features/profiles'
import { requireModulePermissionToEdit } from '../../../route'
import { buildEditPageTitle } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/profiles/$id/edit/')({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildProfileKey(+id),
      queryFn: () => getProfileFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: buildEditPageTitle(loaderData!.firstName, 'Pérfil') }],
  }),
  beforeLoad: requireModulePermissionToEdit(profilesPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const profile = Route.useLoaderData()

  return <EditProfilePage profile={profile} />
}
