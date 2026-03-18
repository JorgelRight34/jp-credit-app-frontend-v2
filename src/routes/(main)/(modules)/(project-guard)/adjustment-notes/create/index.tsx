import { CreateAdjustmentNotePage } from '@/features/adjustment-notes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/adjustment-notes/create/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateAdjustmentNotePage />
}
