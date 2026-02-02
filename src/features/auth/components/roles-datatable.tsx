import { rolesSearchConfig } from '../lib/config/roles-search-form-config'
import { rolesDataTableConfig } from '../lib/config/roles-datatable-config'
import { DataTableContainer } from '@/components'

const RolesDataTable = () => {
  return (
    <DataTableContainer
      searchConfig={rolesSearchConfig}
      datatableConfig={rolesDataTableConfig}
    />
  )
}

export default RolesDataTable
