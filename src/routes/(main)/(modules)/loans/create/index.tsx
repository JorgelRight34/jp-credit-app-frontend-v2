import { CreateLoanFormPage } from '@/features/loans'
import { createProjectQueryKey } from '@/features/projects/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getProjectFn } from '../../projects/settings'
import {
  getModulePermissionsBeforeLoad,
  useSuspenseCurrentProjectId,
} from '../../route'
import { loanPermissionProvider } from '@/features/loans/lib/config/permission-provider'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/loans/create/')({
  head: () => ({ meta: [{ title: buildPageTitle('Crear préstamo') }] }),
  beforeLoad: getModulePermissionsBeforeLoad(loanPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  const { data: project } = useSuspenseData({
    key: createProjectQueryKey(projectId!),
    loader: () => getProjectFn(projectId),
    enabled: !!projectId,
  })

  return <CreateLoanFormPage project={project} />
}
