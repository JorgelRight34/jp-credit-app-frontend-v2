import { createFileRoute } from '@tanstack/react-router'
import { AccessControlPage } from '@/features/auth'

export const Route = createFileRoute('/(modules)/access-control/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AccessControlPage />
}
