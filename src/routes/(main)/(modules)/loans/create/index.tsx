import { CreateLoanFormPage } from '@/features/loans'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/loans/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateLoanFormPage />
}
