import { CreateLoanPurposePage } from '@/features/loans'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(main)/(modules)/loans/purpouses/create/',
)({
  head: () => ({ meta: [{ title: buildPageTitle('Crear destino') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateLoanPurposePage />
}
