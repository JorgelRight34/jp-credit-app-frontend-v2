import {
  BreadcrumbsByRoute,
  PageRouterLayout,
  PriceCheckIcon,
  SellIcon,
  Tab,
  TabsRouter,
} from '@/components'
import { Collateral } from '../models/collateral'
import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import {
  collateralsBreadcrumb,
  createCollateralBreadcrumb,
} from '../lib/config/breadcrumbs'
import CollateralLiquidateForm from '../components/collateral-liquidate-form'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  liquidate: { title: 'Liquidar', icon: PriceCheckIcon },
  sell: { title: 'Vender', icon: SellIcon },
}

const CollateralSettingsPage = ({ collateral }: { collateral: Collateral }) => {
  return (
    <PageRouterLayout
      title={`${collateral.title}`}
      permissionProvider={collateralsPermissionProvider}
      routerConfig={{
        defaultActive: 'liquidate',
        baseBreadcrumbs: [
          collateralsBreadcrumb,
          createCollateralBreadcrumb(collateral),
        ],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="liquidate" title="Liquidar">
          <CollateralLiquidateForm collateral={collateral} />
        </Tab>
        <Tab eventKey="sell" title="Vender"></Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default CollateralSettingsPage
