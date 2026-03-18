import { IncomesPage } from '@/features/finance'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/finance/incomes/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { projectId } = Route.useRouteContext()

  return <IncomesPage projectId={projectId} />
}
