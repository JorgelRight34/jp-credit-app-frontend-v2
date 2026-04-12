import { ProfileChangeHistoryPage } from '@/features/profiles'
import { buildProfileKey } from '@/features/profiles/lib/query-keys'
import { createFileRoute } from '@tanstack/react-router'
import { getProfileFn } from '..'
import { buildHistoryHead } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/profiles/$id/changes/')(
  {
    loader: async ({ context, params: { id } }) =>
      await context.dataClient.ensureQueryData({
        queryKey: buildProfileKey(+id),
        queryFn: () => getProfileFn(id),
      }),

    head: ({ loaderData }) => buildHistoryHead(loaderData, (l) => l.firstName),
    component: RouteComponent,
  },
)

function RouteComponent() {
  const profile = Route.useLoaderData()

  return <ProfileChangeHistoryPage profile={profile} />
}
