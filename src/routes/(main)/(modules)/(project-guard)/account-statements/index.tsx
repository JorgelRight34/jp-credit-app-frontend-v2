import { AccountStatementsPage } from '@/features/account-statements'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/(project-guard)/account-statements/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AccountStatementsPage />
}
