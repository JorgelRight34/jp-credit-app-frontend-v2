import { IncomesPage } from '@/features/finance'
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseCurrentProjectId } from '../../route'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/finance/incomes/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  return <IncomesPage projectId={projectId} />
}
