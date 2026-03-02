import {
  buildCollateralBreadcrumb,
  collateralsBreadcrumb,
} from '../lib/config/breadcrumbs'
import CollateralOverview from '../components/collateral-overview'
import type { BreadcrumbsByRoute } from '@/components'
import type { Collateral } from '../models/collateral'
import {
  buildPageLayoutEditOption,
  buildPageLayoutSettingsOptionLight,
  FileTable,
  mapApiFileToTableFile,
  overviewBreadcrumb,
  PageRouterLayout,
  Tab,
  TabsRouter,
  UploadIcon,
} from '@/components'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: [overviewBreadcrumb],
  files: [{ title: 'Archivos', icon: UploadIcon }],
}

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
        defaultActive: 'overview',
        baseBreadcrumbs: [
          collateralsBreadcrumb,
          buildCollateralBreadcrumb(collateral),
        ],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="overview" title="Resumen">
          <CollateralOverview collateral={collateral} />
        </Tab>
        <Tab eventKey="files" title="Archivos">
          <section>
            <FileTable files={collateral.files.map(mapApiFileToTableFile)} />
          </section>
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default CollateralPage
