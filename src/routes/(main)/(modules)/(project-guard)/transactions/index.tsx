import { TransactionsPage } from '@/features/transactions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/transactions/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { projectId } = Route.useRouteContext()

  return <TransactionsPage projectId={projectId} />
}
