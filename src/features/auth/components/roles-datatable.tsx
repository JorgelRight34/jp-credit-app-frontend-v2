import { rolesSearchConfig } from '../lib/config/roles-search-form-config'
import { rolesDataTableConfig } from '../lib/config/roles-datatable-config'
import { DataTableContainer } from '@/components'
import { rolesQueryKey } from '../lib/constants'

const RolesDataTable = () => {
  return (
    <DataTableContainer
      cacheKey={[rolesQueryKey]}
      searchConfig={rolesSearchConfig}
      datatableConfig={rolesDataTableConfig}
    />
  )
}

export default RolesDataTable
