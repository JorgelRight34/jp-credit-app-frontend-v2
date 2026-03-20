import { createFileRoute } from '@tanstack/react-router'
import { CollateralsPage } from '@/features/collaterals'
import { useSuspenseCurrentProjectId } from '../route'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/collaterals/',
)({
  head: () => ({ meta: [{ title: 'Garantías' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  return <CollateralsPage projectId={projectId} />
}
