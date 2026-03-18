import { FollowUpsPage } from '@/features/follow-ups'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/(project-guard)/follow-ups/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { projectId } = Route.useRouteContext()

  return <FollowUpsPage projectId={projectId} />
}
