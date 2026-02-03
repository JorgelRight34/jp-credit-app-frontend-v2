import { createFileRoute } from '@tanstack/react-router'
import { RoleFormPage } from '@/features/auth'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/roles/create/',
)({
  head: () => ({ meta: [{ title: 'Crear rol' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <RoleFormPage />
}
