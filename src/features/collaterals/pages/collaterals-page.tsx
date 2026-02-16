import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import { collateralsBreadcrumb } from '../lib/config/breadcrumbs'
import CollateralsDataTable from '../components/collaterals-datatable'
import { CollateralTypeMap } from '../models/collateralType'
import type { BreadcrumbsByRoute } from '@/components'
import {
  AllIcon,
  ApartmentIcon,
  DirectionsCarIcon,
  GrassIcon,
  InventoryIcon,
  PageRouterLayout,
  Tab,
  TabsRouter,
  createPageLayoutCreateOption,
} from '@/components'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
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
      options={[createPageLayoutCreateOption('/collaterals/create')]}
      routerConfig={{
        defaultActive: 'all',
        baseBreadcrumbs: [collateralsBreadcrumb],
        breadcrumbsByRoute,
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
            initialQuery={{ isActive: false }}
            initialState={{ columnVisibility: { type: false } }}
          />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default CollateralsPage
