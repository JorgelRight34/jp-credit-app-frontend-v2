import { FollowUpsPage } from '@/features/follow-ups'
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseCurrentProjectId } from '../../route'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/follow-ups/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  return <FollowUpsPage projectId={projectId} />
}
