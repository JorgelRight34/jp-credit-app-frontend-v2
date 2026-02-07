import { collateralSearchConfig } from '../lib/config/collaterals-search-config'
import { collateralsDataTableConfig } from '../lib/config/collaterals-datatable-config'
import type { DataTableContainerOverrides } from '@/components'
import type { Collateral } from '../models/collateral'
import type { CollateralQuery } from '../models/collateralQuery'
import { DataTableContainer } from '@/components'

const CollateralsDataTable = (
  props: DataTableContainerOverrides<Collateral, CollateralQuery>,
) => {
  return (
    <DataTableContainer
      searchConfig={collateralSearchConfig}
      datatableConfig={collateralsDataTableConfig}
      {...props}
    />
  )
}

export default CollateralsDataTable
