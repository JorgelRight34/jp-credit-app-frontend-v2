import {
  ChangeHistoryDataTable,
  ChangeHistoryPageLayout,
} from '@/features/audit'
import { PropsWithCollateral } from '../models/collateral'
import { buildCollateralBreadcrumb } from './collateral-page'
import { buildCollateralChangeHistoryKey } from '../lib/query-keys'
import { getCollateralChangeHistory } from '../services/collateralClient'
import { collateralsBreadcrumb } from './collaterals-page'

const CollateralChangeHistoryPage = ({ collateral }: PropsWithCollateral) => {
  const collateralId = collateral.id

  return (
    <ChangeHistoryPageLayout
      title={collateral.title}
      breadcrumbs={[
        collateralsBreadcrumb,
        buildCollateralBreadcrumb(collateral),
      ]}
    >
      <ChangeHistoryDataTable
        cacheKey={buildCollateralChangeHistoryKey(collateralId)}
        loader={(q) => getCollateralChangeHistory(collateralId, q)}
      />
    </ChangeHistoryPageLayout>
  )
}

export default CollateralChangeHistoryPage
