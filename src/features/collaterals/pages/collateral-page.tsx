import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import { collateralsBreadcrumb } from '../lib/config/breadcrumbs'
import { collateralIconByTypeMap } from '../lib/jsx-utils'
import CollateralOverview from '../components/collateral-overview'
import CollateralEditFilesForm from '../components/collateral-edit-files-form'
import type { BreadcrumbsByRoute } from '@/components'
import type { Collateral } from '../models/collateral'
import {
  OverviewIcon,
  PageRouterLayout,
  Tab,
  TabsRouter,
  UploadIcon,
  getPageLayoutOptions,
} from '@/components'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: { title: 'Overview', icon: OverviewIcon },
  files: { title: 'Archivos', icon: UploadIcon },
}

const CollateralPage = ({ collateral }: { collateral: Collateral }) => {
  return (
    <PageRouterLayout
      title={collateral.title}
      permissionProvider={collateralsPermissionProvider}
      options={getPageLayoutOptions({
        editPath: '/collaterals/$id/edit',
        params: { id: collateral.id.toString() },
      })}
      routerConfig={{
        defaultActive: 'overview',
        baseBreadcrumbs: [
          collateralsBreadcrumb,
          {
            title: collateral.title,
            icon: collateralIconByTypeMap[collateral.type],
          },
        ],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="overview" title="Overview">
          <CollateralOverview collateral={collateral} />
        </Tab>
        <Tab eventKey="files" title="Archivos">
          <CollateralEditFilesForm collateral={collateral} />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default CollateralPage
