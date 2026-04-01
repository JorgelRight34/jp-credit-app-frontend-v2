import { LoanPurpousesPage } from '@/features/loans'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(main)/(modules)/loans/purpouses/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoanPurpousesPage />
}
