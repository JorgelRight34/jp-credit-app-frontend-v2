import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import { collateralsBreadcrumb } from '../lib/config/breadcrumbs'
import CollateralsDataTable from '../components/collaterals-datatable'
import { CollateralStatusMap } from '../models/collateralStatus'
import { CollateralTypeMap } from '../models/collateralType'
import type { RouteBreadcrumbMap } from '@/components'
import {
  AllIcon,
  ApartmentIcon,
  DirectionsCarIcon,
  GrassIcon,
  InventoryIcon,
  PageRouterLayout,
  Tab,
  TabsRouter,
  getPageLayoutOptions,
} from '@/components'

const tabBreadcrumbMap: RouteBreadcrumbMap = {
  all: { title: 'Todos', icon: () => <AllIcon /> },
  inventory: { title: 'Inventario', icon: () => <InventoryIcon /> },
  vehicles: { title: 'Vehículos', icon: () => <DirectionsCarIcon /> },
  mortgage: { title: 'Hipotecas', icon: () => <ApartmentIcon /> },
  agriculturalLoan: { title: 'Agrícola', icon: () => <GrassIcon /> },
}

const CollateralsPage = () => {
  return (
    <PageRouterLayout
      title="Garantías"
      permissionProvider={collateralsPermissionProvider}
      options={getPageLayoutOptions({ createPath: '/collaterals/create' })}
      routerConfig={{
        defaultActive: 'all',
        baseBreadcrumbs: [collateralsBreadcrumb],
        tabBreadcrumbMap,
      }}
    >
      <TabsRouter>
        <Tab eventKey="all" title="Todos">
          <CollateralsDataTable />
        </Tab>
        <Tab eventKey="vehicles" title="Vehículos">
          <CollateralsDataTable
            initialQuery={{ type: CollateralTypeMap.CarLoan }}
            initialState={{ columnVisibility: { type: false } }}
          />
        </Tab>
        <Tab eventKey="mortgage" title="Hipotecas">
          <CollateralsDataTable
            initialQuery={{ type: CollateralTypeMap.AgriculturalLoan }}
            initialState={{ columnVisibility: { type: false } }}
          />
        </Tab>
        <Tab eventKey="agriculturalLoan" title="Agrícola">
          <CollateralsDataTable
            initialQuery={{ type: CollateralTypeMap.AgriculturalLoan }}
            initialState={{ columnVisibility: { type: false } }}
          />
        </Tab>
        <Tab eventKey="inventory" title="Inventario">
          <CollateralsDataTable
            initialQuery={{ status: CollateralStatusMap.USED_FOR_SETTLEMENT }}
            initialState={{ columnVisibility: { type: false } }}
          />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default CollateralsPage
