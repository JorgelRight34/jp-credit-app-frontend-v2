import { DataTableContainer } from '@/components'
import { backgroundServicesDataTableConfig } from '../lib/config/background-services-datatable-config'
import { backgroundServicesSearchConfig } from './background-services-search-config'
import { backgroundServiceQueryKey } from '../lib/config/query-keys'

const BackgroundServicesDataTable = () => (
  <DataTableContainer
    searchConfig={backgroundServicesSearchConfig}
    datatableConfig={backgroundServicesDataTableConfig}
    cacheKey={[backgroundServiceQueryKey]}
  />
)

export default BackgroundServicesDataTable
