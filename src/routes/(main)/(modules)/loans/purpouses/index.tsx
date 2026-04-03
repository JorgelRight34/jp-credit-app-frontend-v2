import { LoanPurpousesPage } from '@/features/loans'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/loans/purpouses/')({
  head: () => ({ meta: [{ title: buildPageTitle('Destinos') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <LoanPurpousesPage />
}
