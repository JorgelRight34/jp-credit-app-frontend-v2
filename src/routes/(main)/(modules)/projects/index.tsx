import { ProjectsPage } from '@/features/projects'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const projectSchema = z.object({ projectId: z.number().optional() })

export const Route = createFileRoute('/(main)/(modules)/projects/')({
  component: RouteComponent,
  validateSearch: (search) => projectSchema.parse(search),
})

function RouteComponent() {
  const { projectId } = Route.useSearch()

  return <ProjectsPage projectId={projectId} />
}
