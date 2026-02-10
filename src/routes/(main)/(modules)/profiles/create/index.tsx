import { CreateProfileFormPage } from '@/features/profiles'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/profiles/create/')({
  head: () => ({ meta: [{ title: 'Crear pérfil' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateProfileFormPage />
}
