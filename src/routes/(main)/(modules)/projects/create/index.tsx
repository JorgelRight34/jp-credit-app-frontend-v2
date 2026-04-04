import { CreateProjectFormPage } from '@/features/projects'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/projects/create/')({
  head: () => ({ meta: [{ title: buildPageTitle('Crear proyecto') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateProjectFormPage />
}
