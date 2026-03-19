import { createFileRoute } from '@tanstack/react-router'
import { CollateralsPage } from '@/features/collaterals'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/collaterals/',
)({
  head: () => ({ meta: [{ title: 'Garantías' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const { projectId } = Route.useRouteContext()

  return <CollateralsPage projectId={projectId} />
}
