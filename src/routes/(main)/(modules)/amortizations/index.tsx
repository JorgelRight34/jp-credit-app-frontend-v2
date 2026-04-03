import { AmortizationsPage } from '@/features/amortizations'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/amortizations/')({
  head: () => ({ meta: [{ title: buildPageTitle('Amortizaciones') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <AmortizationsPage />
}
