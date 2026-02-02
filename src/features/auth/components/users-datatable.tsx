import { userSearchConfig } from '../lib/config/users-search-form-config'
import { usersDatatableConfig } from '../lib/config/users-datatable-config'
import { DataTableContainer } from '@/components'

const UsersDataTable = () => {
  return (
    <DataTableContainer
      searchConfig={userSearchConfig}
      datatableConfig={usersDatatableConfig}
    />
  )
}

export default UsersDataTable
