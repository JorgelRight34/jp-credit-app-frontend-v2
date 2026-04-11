import { CreateProjectFormPage } from '@/features/projects'
import { buildCreatePageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/projects/create/')({
  head: () => ({ meta: [{ title: buildCreatePageTitle('Proyecto') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateProjectFormPage />
}
