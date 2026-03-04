import { CreateReportPage } from '@/features/reports'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/reports/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateReportPage />
}
