import { createFileRoute } from '@tanstack/react-router'
import { UserFormPage } from '@/features/auth'

export const Route = createFileRoute('/(main)/(modules)/access-control/users/create/')({
  head: () => ({ meta: [{ title: 'Crear acceso' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <UserFormPage />
}
