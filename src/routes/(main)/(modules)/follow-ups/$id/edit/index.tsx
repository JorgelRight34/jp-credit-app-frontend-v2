import { buildFollowUpQueryKey } from '@/features/follow-ups/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getFollowUpFn } from '..'
import { EditFollowUpPage } from '@/features/follow-ups'

export const Route = createFileRoute('/(main)/(modules)/follow-ups/$id/edit/')({
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
