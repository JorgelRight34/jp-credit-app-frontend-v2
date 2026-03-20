import { ProjectionsPage } from '@/features/finance'
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseCurrentProjectId } from '../../route'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/finance/projections/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  return <ProjectionsPage projectId={projectId} />
}
