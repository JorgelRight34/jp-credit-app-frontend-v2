import { collateralSearchConfig } from '../lib/config/collaterals-search-config'
import { CollateralDataTableConfig } from '../lib/config/collateral-datatable-config'
import type { DataTableContainerOverrides } from '@/components'
import type { Collateral } from '../models/collateral'
import type { CollateralQuery } from '../models/collateralQuery'
import { DataTableContainer } from '@/components'
import { collateralsQueryKey } from '../lib/constants'
import { useProjectId } from '@/features/projects'

const CollateralDataTable = (
  props: DataTableContainerOverrides<Collateral, CollateralQuery>,
) => {
  const [projectId] = useProjectId()

  return (
    <DataTableContainer
      searchConfig={collateralSearchConfig}
      datatableConfig={CollateralDataTableConfig}
      cacheKey={[collateralsQueryKey, projectId]}
      {...props}
    />
  )
}

export default CollateralDataTable
