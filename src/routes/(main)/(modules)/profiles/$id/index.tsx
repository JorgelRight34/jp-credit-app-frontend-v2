import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { buildProfileFullName, ProfilePage } from '@/features/profiles'
import { getProfileFromServer } from '@/features/profiles/server/profileServerClient'
import { getProfile } from '@/features/profiles/services/profileClient'
import { buildProfileKey } from '@/features/profiles/lib/query-keys'
import { buildPageTitle } from '@/lib/utils'

export const getProfileFn = createIsomorphicFn()
  .server((id) => getProfileFromServer(id))
  .client((id) => getProfile(id))

export const Route = createFileRoute('/(main)/(modules)/profiles/$id/')({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildProfileKey(+id),
      queryFn: () => getProfileFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: buildPageTitle(buildProfileFullName(loaderData!)) }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const profile = Route.useLoaderData()

  return <ProfilePage profile={profile} />
}
