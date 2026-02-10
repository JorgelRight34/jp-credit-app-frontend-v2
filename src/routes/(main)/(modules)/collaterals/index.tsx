import { createFileRoute } from '@tanstack/react-router'
import { CollateralsPage } from '@/features/collaterals'

export const Route = createFileRoute('/(main)/(modules)/collaterals/')({
  head: () => ({ meta: [{ title: 'Garantías' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <CollateralsPage />
}
