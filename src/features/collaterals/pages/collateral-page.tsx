import CollateralOverview from '../components/collateral-overview'
import type { BreadcrumbsByRoute, BreadcrumbSpec } from '@/components'
import type { Collateral } from '../models/collateral'
import {
  buildPageLayoutEditOption,
  buildPageLayoutSettingsOptionLight,
  CollateralIcon,
  FileTable,
  mapApiFileToTableFile,
  overviewBreadcrumb,
  PageRouterLayout,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
  UploadIcon,
} from '@/components'
import { collateralIconByTypeMap } from '../lib/jsx-utils'

export const buildCollateralBreadcrumb = (
  collateral: Collateral,
): BreadcrumbSpec => ({
  title: collateral.title,
  icon: collateralIconByTypeMap[collateral.type],
  pathname: '/collaterals/$id',
  params: { id: collateral.id.toString() },
})

export const collateralsBreadcrumb: BreadcrumbSpec = {
  title: 'Garantías',
  icon: CollateralIcon,
  pathname: '/collaterals',
}

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [overviewBreadcrumb],
  [{ title: 'Archivos', icon: UploadIcon }],
]

const CollateralPage = ({ collateral }: { collateral: Collateral }) => {
  return (
    <PageRouterLayout
      title={collateral.title}
      options={[
        buildPageLayoutSettingsOptionLight('/collaterals/$id/settings', {
          id: collateral.id.toString(),
        }),
        buildPageLayoutEditOption('/collaterals/$id/edit', {
          id: collateral.id.toString(),
        }),
      ]}
      routerConfig={{
        baseBreadcrumbs: [
          collateralsBreadcrumb,
          buildCollateralBreadcrumb(collateral),
        ],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Resumen</Tab>
          <Tab index={1}>Archivos</Tab>
        </TabsList>
        <TabPanel index={0}>
          <CollateralOverview collateral={collateral} />
        </TabPanel>
        <TabPanel index={1}>
          <FileTable files={collateral.files.map(mapApiFileToTableFile)} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default CollateralPage
