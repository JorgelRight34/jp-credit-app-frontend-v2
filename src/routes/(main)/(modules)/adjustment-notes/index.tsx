import { AdjustmentNotesPage } from '@/features/adjustment-notes'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/adjustment-notes/')({
  head: () => ({ meta: [{ title: buildPageTitle('Notas de ajuste') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <AdjustmentNotesPage />
}
