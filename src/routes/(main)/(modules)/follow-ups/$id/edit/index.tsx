import { buildFollowUpQueryKey } from '@/features/follow-ups/lib/query-keys'
import { createFileRoute } from '@tanstack/react-router'
import { getFollowUpFn } from '..'
import { EditFollowUpPage } from '@/features/follow-ups'
import { requireModulePermissionToEdit } from '@/routes/(main)/(modules)/route'
import { followUpPermissionProvider } from '@/features/follow-ups/lib/config/permission-provider'
import { buildEditHead } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/follow-ups/$id/edit/')({
  beforeLoad: requireModulePermissionToEdit(followUpPermissionProvider),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildFollowUpQueryKey(+id),
      queryFn: () => getFollowUpFn(id),
    }),
  head: ({ loaderData }) => buildEditHead(loaderData, (l) => l.title),
  component: RouteComponent,
})

function RouteComponent() {
  const followUp = Route.useLoaderData()

  return <EditFollowUpPage followUp={followUp} />
}
