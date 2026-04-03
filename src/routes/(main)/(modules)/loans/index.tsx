import { LoansPage } from '@/features/loans'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/loans/')({
  head: () => ({ meta: [{ title: buildPageTitle('Préstamos') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <LoansPage />
}
