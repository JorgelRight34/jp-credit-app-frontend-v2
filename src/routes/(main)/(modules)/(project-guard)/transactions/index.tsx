import { TransactionsPage } from '@/features/transactions'
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseCurrentProjectId } from '../route'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/transactions/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  return <TransactionsPage projectId={projectId} />
}
