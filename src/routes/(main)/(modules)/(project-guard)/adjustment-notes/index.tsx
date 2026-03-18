import { AdjustmentNotesPage } from '@/features/adjustment-notes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/(project-guard)/adjustment-notes/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { projectId } = Route.useRouteContext()

  return <AdjustmentNotesPage projectId={projectId} />
}
