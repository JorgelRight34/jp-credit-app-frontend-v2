import { ProjectsPage } from '@/features/projects'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProjectsPage />
}
