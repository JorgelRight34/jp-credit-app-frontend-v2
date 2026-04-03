import { createFileRoute } from '@tanstack/react-router'
import { ProfilesPage } from '@/features/profiles'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/profiles/')({
  head: () => ({ meta: [{ title: buildPageTitle('Pérfiles') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <ProfilesPage />
}
