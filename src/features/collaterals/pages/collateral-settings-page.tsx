import {
  BreadcrumbsByRoute,
  ClosedProcessPanel,
  PageRouterLayout,
  PriceCheckIcon,
  ProtectedComponent,
  SellIcon,
  settingsBreadcrumb,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'
import { Collateral } from '../models/collateral'
import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import CollateralLiquidateForm from '../components/collateral-liquidate-form'
import CollateralSellForm from '../components/collateral-sell-form'
import { buildCollateralBreadcrumb } from './collateral-page'
import { collateralsBreadcrumb } from './collaterals-page'

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ title: 'Liquidar', icon: PriceCheckIcon }],
  [{ title: 'Vender', icon: SellIcon }],
]

const CollateralSettingsPage = ({ collateral }: { collateral: Collateral }) => {
  return (
    <PageRouterLayout
      title={collateral.title}
      routerConfig={{
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
          <TabsList>
            <Tab index={0}>Liquidar</Tab>
            <Tab index={1}>Vender </Tab>
          </TabsList>
          <TabPanel index={0}>
            {collateral.liquidationDate ? (
              <ClosedProcessPanel />
            ) : (
              <CollateralLiquidateForm collateral={collateral} />
            )}
          </TabPanel>
          <TabPanel index={1}>
            {collateral.soldDate || collateral.isActive ? (
              <ClosedProcessPanel />
            ) : (
              <CollateralSellForm collateral={collateral} />
            )}
          </TabPanel>
        </TabsRouter>
      </ProtectedComponent>
    </PageRouterLayout>
  )
}

export default CollateralSettingsPage
