import { createFileRoute } from '@tanstack/react-router'
import { UserFormPage } from '@/features/auth'

export const Route = createFileRoute('/(modules)/access-control/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserFormPage title="Accesos" />
}
