import { userSearchConfig } from '../lib/config/searchFormConfig'
import { usersDatatableConfig } from '../lib/config/dataTableConfig'
import { DataTableContainer } from '@/components'

const UsersDataTable = () => {
  console.log('hey')
  return (
    <DataTableContainer
      searchConfig={userSearchConfig}
      datatableConfig={usersDatatableConfig}
    />
  )
}

export default UsersDataTable
