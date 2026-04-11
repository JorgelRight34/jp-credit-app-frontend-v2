import { DeleteFormPageLayout } from '@/components'
import { PropsWithCollateral } from '../models/collateral'
import DeleteCollateralForm from '../components/delete-collateral-form'
import { collateralsBreadcrumb } from './collaterals-page'
import { buildCollateralBreadcrumb } from './collateral-page'

const DeleteCollateralPage = ({ collateral }: PropsWithCollateral) => (
  <DeleteFormPageLayout
    title={collateral.title}
    breadcrumbs={[collateralsBreadcrumb, buildCollateralBreadcrumb(collateral)]}
    disabled={collateral.isActive}
  >
    <DeleteCollateralForm collateral={collateral} />
  </DeleteFormPageLayout>
)

export default DeleteCollateralPage
