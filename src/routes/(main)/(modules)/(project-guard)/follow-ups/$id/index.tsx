import { buildFollowUpQueryKey } from '@/features/follow-ups/lib/query-keys'
import FollowUpPage from '@/features/follow-ups/pages/follow-up-page'
import { getFollowUpFromServer } from '@/features/follow-ups/server/followUpServerClient'
import { getFollowUp } from '@/features/follow-ups/services/followUpClient'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getFollowUpFn = createIsomorphicFn()
  .server((id) => getFollowUpFromServer(id))
  .client((id) => getFollowUp(id))

export const Route = createFileRoute('/(main)/(modules)/(project-guard)/follow-ups/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data } = useSuspenseData({
    key: buildFollowUpQueryKey(+id),
    loader: () => getFollowUpFn(id),
  })

  return <FollowUpPage followUp={data} />
}
