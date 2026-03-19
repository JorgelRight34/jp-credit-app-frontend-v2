import { ProjectionsPage } from '@/features/finance'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/finance/projections/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { projectId } = Route.useRouteContext()

  return <ProjectionsPage projectId={projectId} />
}
