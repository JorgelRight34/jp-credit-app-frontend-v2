import { GenerateReportPage } from '@/features/reports'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/reports/generate/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <GenerateReportPage />
}
