import { CreateProjectFormPage } from '@/features/projects'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/projects/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateProjectFormPage />
}
