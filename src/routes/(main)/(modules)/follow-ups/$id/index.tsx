import { buildFollowUpQueryKey } from '@/features/follow-ups/lib/query-keys'
import FollowUpPage from '@/features/follow-ups/pages/follow-up-page'
import { getFollowUpFromServer } from '@/features/follow-ups/server/followUpServerClient'
import { getFollowUp } from '@/features/follow-ups/services/followUpClient'
import { buildCreatePageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getFollowUpFn = createIsomorphicFn()
  .server((id) => getFollowUpFromServer(id))
  .client((id) => getFollowUp(id))

export const Route = createFileRoute('/(main)/(modules)/follow-ups/$id/')({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildFollowUpQueryKey(+id),
      queryFn: () => getFollowUpFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: buildCreatePageTitle(loaderData!.title) }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const followUp = Route.useLoaderData()

  return <FollowUpPage followUp={followUp} />
}
