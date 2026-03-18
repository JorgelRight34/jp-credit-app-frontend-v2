import { LoansPage } from '@/features/loans'
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseCurrentProjectId } from '../../route'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/loans/',
)({
  head: () => ({ meta: [{ title: 'Préstamos' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  return <LoansPage projectId={projectId} />
}
