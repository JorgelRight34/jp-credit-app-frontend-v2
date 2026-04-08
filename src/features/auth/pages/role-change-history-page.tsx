import {
  ChangeHistoryDataTable,
  ChangeHistoryPageLayout,
} from '@/features/audit'
import { PropsWithRole } from '../models/role'
import { accessControlBreadcrumb } from './access-control-page'
import { buildRoleBreadcrumb, rolesModuleBreadcrumb } from './role-page'
import { buildRoleChangeHistoryQueryKey } from '../lib/query-keys'
import { getRoleChangeHistory } from '../services/authService'

const RoleChangeHistoryPage = ({ role }: PropsWithRole) => {
  return (
    <ChangeHistoryPageLayout
      title={role.name}
      breadcrumbs={[
        accessControlBreadcrumb,
        rolesModuleBreadcrumb,
        buildRoleBreadcrumb(role),
      ]}
    >
      <ChangeHistoryDataTable
        cacheKey={buildRoleChangeHistoryQueryKey(role.id)}
        loader={(q) => getRoleChangeHistory(role.id, q)}
      />
    </ChangeHistoryPageLayout>
  )
}

export default RoleChangeHistoryPage
