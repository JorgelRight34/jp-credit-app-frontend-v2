import { ProjectionsPage } from '@/features/finance'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/finance/projections/')({
  head: () => ({ meta: [{ title: buildPageTitle('Proyecciones') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <ProjectionsPage />
}
