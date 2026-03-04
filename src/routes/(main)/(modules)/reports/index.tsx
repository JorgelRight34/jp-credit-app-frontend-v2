import { ReportsPage } from '@/features/reports'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/reports/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ReportsPage />
}
