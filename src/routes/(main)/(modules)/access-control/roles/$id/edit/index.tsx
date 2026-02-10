import { createFileRoute } from '@tanstack/react-router'
import { getRoleFn } from '..'
import { EditRoleFormPage, createRoleQueryKey } from '@/features/auth'
import { useSuspenseData } from '@/hooks/useData'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/roles/$id/edit/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: role } = useSuspenseData({
    key: createRoleQueryKey(id),
    loader: () => getRoleFn(+id),
  })

  return <EditRoleFormPage role={role} />
}
