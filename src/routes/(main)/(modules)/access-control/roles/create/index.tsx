import { CreateRoleFormPage } from '@/features/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/roles/create/',
)({
  head: () => ({ meta: [{ title: 'Crear rol' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateRoleFormPage />
}
