import { AccountStatementsPage } from '@/features/account-statements'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/account-statements/')({
  head: () => ({ meta: [{ title: buildPageTitle('Estados de cuenta') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <AccountStatementsPage />
}
