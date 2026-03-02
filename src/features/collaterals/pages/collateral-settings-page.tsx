import {
  BreadcrumbsByRoute,
  ClosedProcessPanel,
  PageRouterLayout,
  PriceCheckIcon,
  ProtectedComponent,
  SellIcon,
  settingsBreadcrumb,
  Tab,
  TabsRouter,
} from '@/components'
import { Collateral } from '../models/collateral'
import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import {
  collateralsBreadcrumb,
  buildCollateralBreadcrumb,
} from '../lib/config/breadcrumbs'
import CollateralLiquidateForm from '../components/collateral-liquidate-form'
import CollateralSellForm from '../components/collateral-sell-form'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  liquidate: [{ title: 'Liquidar', icon: PriceCheckIcon }],
  sell: [{ title: 'Vender', icon: SellIcon }],
}

const CollateralSettingsPage = ({ collateral }: { collateral: Collateral }) => {
  return (
    <PageRouterLayout
      title={`${collateral.title}`}
      routerConfig={{
        defaultActive: 'liquidate',
        baseBreadcrumbs: [
          collateralsBreadcrumb,
          buildCollateralBreadcrumb(collateral),
          settingsBreadcrumb,
        ],
        breadcrumbsByRoute,
      }}
    >
      <ProtectedComponent
        provider={collateralsPermissionProvider}
        isAuthorizedFn={(p) => p.canEdit}
      >
        <TabsRouter>
          <Tab eventKey="liquidate" title="Liquidar">
            {collateral.liquidationDate ? (
              <ClosedProcessPanel />
            ) : (
              <CollateralLiquidateForm collateral={collateral} />
            )}
          </Tab>
          <Tab eventKey="sell" title="Vender">
            {collateral.sellDate ? (
              <ClosedProcessPanel />
            ) : (
              <CollateralSellForm collateral={collateral} />
            )}
          </Tab>
        </TabsRouter>
      </ProtectedComponent>
    </PageRouterLayout>
  )
}

export default CollateralSettingsPage
