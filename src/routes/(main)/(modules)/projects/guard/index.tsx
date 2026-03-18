import { ProjectGuardPage } from '@/features/projects'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/projects/guard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProjectGuardPage />
}
