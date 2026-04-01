import { CreateLoanPurposePage } from '@/features/loans'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(main)/(modules)/loans/purpouses/create/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateLoanPurposePage />
}
