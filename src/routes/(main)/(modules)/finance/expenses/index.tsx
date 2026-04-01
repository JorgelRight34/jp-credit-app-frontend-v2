import { ExpensesPage } from '@/features/finance'
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseCurrentProjectId } from '../../(project-guard)/route'

export const Route = createFileRoute(
  '/(main)/(modules)/finance/expenses/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  return <ExpensesPage projectId={projectId} />
}
