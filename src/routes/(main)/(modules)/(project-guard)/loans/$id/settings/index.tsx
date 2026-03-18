import { LoanSettingsPage } from '@/features/loans'
import { createLoanQueryKey } from '@/features/loans/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getLoanFn } from '..'

export const Route = createFileRoute('/(main)/(modules)/(project-guard)/loans/$id/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: loan } = useSuspenseData({
    key: createLoanQueryKey(+id),
    loader: () => getLoanFn(id),
  })

  return <LoanSettingsPage loan={loan} />
}
