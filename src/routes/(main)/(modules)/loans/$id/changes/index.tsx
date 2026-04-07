import { buildLoanQueryKey, LoanChangeHistoryPage } from '@/features/loans'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getLoanFn } from '..'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/loans/$id/changes/')({
  head: () => ({ meta: [{ title: buildPageTitle('Historial de cambios') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: loan } = useSuspenseData({
    key: buildLoanQueryKey(+id),
    loader: () => getLoanFn(id),
  })

  return <LoanChangeHistoryPage loan={loan} />
}
