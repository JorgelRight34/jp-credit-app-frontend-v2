import { createFileRoute } from '@tanstack/react-router'
import { ProfilesPage } from '@/features/profiles'

export const Route = createFileRoute('/(main)/(modules)/profiles/')({
  head: () => ({ meta: [{ title: 'Pérfiles' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <ProfilesPage />
}
