import { createFileRoute } from '@tanstack/react-router'
import { ProfileFormPage } from '@/features/profiles'

export const Route = createFileRoute('/(main)/(modules)/profiles/create/')({
  head: () => ({ meta: [{ title: 'Crear pérfil' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <ProfileFormPage />
}
