import { buildFollowUpQueryKey } from '@/features/follow-ups/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getFollowUpFn } from '..'
import { EditFollowUpPage } from '@/features/follow-ups'
import { getModulePermissionsBeforeLoad } from '@/routes/(main)/(modules)/route'
import { followUpPermissionProvider } from '@/features/follow-ups/lib/config/permission-provider'

export const Route = createFileRoute(
  '/(main)/(modules)/follow-ups/$id/edit/',
)({
  beforeLoad: getModulePermissionsBeforeLoad(followUpPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data } = useSuspenseData({
    key: buildFollowUpQueryKey(+id),
    loader: () => getFollowUpFn(id),
  })

  return <EditFollowUpPage followUp={data} />
}
