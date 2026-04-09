import CollateralOverview from '../components/collateral-overview'
import type { BreadcrumbsByRoute, BreadcrumbSpec } from '@/components'
import type { Collateral } from '../models/collateral'
import {
  buildPageLayoutEditOption,
  buildPageLayoutMenuOption,
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
import { changeHistoryLinkLabel } from '@/features/audit'
import { collateralsBreadcrumb } from './collaterals-page'

export const buildCollateralBreadcrumb = (
  collateral: Collateral,
): BreadcrumbSpec => ({
  title: collateral.title,
  icon: collateralIconByTypeMap[collateral.type],
  pathname: '/collaterals/$id',
  params: { id: collateral.id.toString() },
})

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [overviewBreadcrumb],
  [{ title: 'Archivos', icon: UploadIcon }],
]

const CollateralPage = ({ collateral }: { collateral: Collateral }) => {
  const id = collateral.id.toString()

  return (
    <PageRouterLayout
      title={collateral.title}
      options={[
        buildPageLayoutMenuOption([
          {
            label: 'Configuración',
            to: '/collaterals/$id/settings',
            params: { id },
          },
          {
            label: changeHistoryLinkLabel,
            to: '/collaterals/$id/changes',
            params: { id },
          },
        ]),
        buildPageLayoutEditOption(
          '/collaterals/$id/edit',
          { id },
          collateral.isActive === false,
          'No puede editar una garantía desactiva',
        ),
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
