import { collateralSearchConfig } from '../lib/config/collaterals-search-config'
import { collateralsDataTableConfig } from '../lib/config/collaterals-datatable-config'
import type { DataTableContainerOverrides } from '@/components'
import type { Collateral } from '../models/collateral'
import type { CollateralQuery } from '../models/collateralQuery'
import { DataTableContainer } from '@/components'
import { collateralsQueryKey } from '../lib/constants'
import { useProjectId } from '@/features/projects'

const CollateralsDataTable = (
  props: DataTableContainerOverrides<Collateral, CollateralQuery>,
) => {
  const [projectId] = useProjectId()

  return (
    <DataTableContainer
      searchConfig={collateralSearchConfig}
      datatableConfig={collateralsDataTableConfig}
      cacheKey={[collateralsQueryKey, projectId]}
      {...props}
    />
  )
}

export default CollateralsDataTable
