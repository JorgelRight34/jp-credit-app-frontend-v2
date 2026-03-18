import { LoansPage } from '@/features/loans'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/(project-guard)/loans/')({
  head: () => ({ meta: [{ title: 'Préstamos' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const { projectId } = Route.useRouteContext()

  return <LoansPage projectId={projectId} />
}
