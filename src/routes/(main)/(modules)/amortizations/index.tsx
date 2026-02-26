import { AmortizationsPage } from '@/features/amortizations'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/amortizations/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AmortizationsPage />
}
