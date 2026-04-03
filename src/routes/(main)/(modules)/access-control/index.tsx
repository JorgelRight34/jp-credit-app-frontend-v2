import { createFileRoute } from '@tanstack/react-router'
import { AccessControlPage } from '@/features/auth'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/access-control/')({
  head: () => ({ meta: [{ title: buildPageTitle('Accesos') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <AccessControlPage />
}
