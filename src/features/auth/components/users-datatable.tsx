import { userSearchConfig } from '../lib/config/users-search-form-config'
import { usersDatatableConfig } from '../lib/config/users-datatable-config'
import type { DataTableContainerOverrides } from '@/components'
import type { User } from '../models/user'
import type { UserQuery } from '../models/userQuery'
import { DataTableContainer } from '@/components'
import { usersQueryKey } from '../lib/constants'

const UsersDataTable = (
  config: DataTableContainerOverrides<User, UserQuery>,
) => (
  <DataTableContainer
    searchConfig={userSearchConfig}
    datatableConfig={usersDatatableConfig}
    cacheKey={[usersQueryKey]}
    {...config}
  />
)

export default UsersDataTable
