import { SystemPage } from '@/features/system'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/system/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SystemPage />
}
