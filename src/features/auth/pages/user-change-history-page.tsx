import {
  ChangeHistoryDataTable,
  ChangeHistoryPageLayout,
} from '@/features/audit'
import { PropsWithUser } from '@/models/user'
import { accessControlBreadcrumb } from './access-control-page'
import { buildUserBreadcrumb, usersModuleBreadcrumb } from './user-page'
import { buildUserChangeHistoryQueryKey } from '../lib/query-keys'
import { getUserChangeHistory } from '../services/userClient'

const UserChangeHistoryPage = ({ user }: PropsWithUser) => {
  return (
    <ChangeHistoryPageLayout
      title={user.username}
      breadcrumbs={[
        accessControlBreadcrumb,
        usersModuleBreadcrumb,
        buildUserBreadcrumb(user),
      ]}
    >
      <ChangeHistoryDataTable
        cacheKey={buildUserChangeHistoryQueryKey(user.username)}
        loader={(q) => getUserChangeHistory(user.id, q)}
      />
    </ChangeHistoryPageLayout>
  )
}

export default UserChangeHistoryPage
