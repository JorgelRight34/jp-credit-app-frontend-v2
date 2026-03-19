import { collateralSearchConfig } from '../lib/config/collaterals-search-config'
import { collateralDataTableConfig } from '../lib/config/collateral-datatable-config'
import type { DataTableContainerOverrides } from '@/components'
import type { Collateral } from '../models/collateral'
import type { CollateralQuery } from '../models/collateralQuery'
import { DataTableContainer } from '@/components'
import { collateralsQueryKey } from '../lib/constants'

const CollateralDataTable = (
  props: DataTableContainerOverrides<Collateral, CollateralQuery>,
) => {
  return (
    <DataTableContainer
      searchConfig={collateralSearchConfig}
      datatableConfig={collateralDataTableConfig}
      cacheKey={[collateralsQueryKey]}
      {...props}
    />
  )
}

export default CollateralDataTable
