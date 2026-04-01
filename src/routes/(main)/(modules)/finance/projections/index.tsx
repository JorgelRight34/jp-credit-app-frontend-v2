import { ProjectionsPage } from '@/features/finance'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/finance/projections/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProjectionsPage />
}
