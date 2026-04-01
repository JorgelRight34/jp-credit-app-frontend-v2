import { AdjustmentNotesPage } from '@/features/adjustment-notes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/adjustment-notes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AdjustmentNotesPage />
}
