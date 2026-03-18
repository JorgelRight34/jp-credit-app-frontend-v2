import { CreateCollateralFormPage } from '@/features/collaterals'
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseCurrentProjectId } from '../../../route'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/collaterals/create/',
)({
  head: () => ({ meta: [{ title: 'Crear garantía' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  return <CreateCollateralFormPage projectId={projectId} />
}
