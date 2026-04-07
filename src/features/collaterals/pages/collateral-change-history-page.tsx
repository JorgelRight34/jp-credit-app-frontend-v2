import {
  ChangeHistoryDataTable,
  ChangeHistoryPageLayout,
} from '@/features/audit'
import { PropsWithCollateral } from '../models/collateral'
import {
  buildCollateralBreadcrumb,
  collateralsBreadcrumb,
} from './collateral-page'
import { buildCollateralChangeHistoryKey } from '../lib/query-keys'
import { getCollateralChangeHistory } from '../services/collateralClient'

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
