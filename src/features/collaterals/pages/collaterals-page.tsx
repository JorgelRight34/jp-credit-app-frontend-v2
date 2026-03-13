import CollateralDataTable from '../components/collaterals-datatable'
import { collateralTypeMap } from '../models/collateralType'
import type { BreadcrumbsByRoute } from '@/components'
import {
  AllIcon,
  ApartmentIcon,
  DirectionsCarIcon,
  GrassIcon,
  InventoryIcon,
  PageRouterLayout,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
  buildPageLayoutCreateOption,
} from '@/components'
import { collateralsBreadcrumb } from './collateral-page'

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ title: 'Todos', icon: AllIcon }],
  [{ title: 'Inventario', icon: InventoryIcon }],
  [{ title: 'Vehículos', icon: DirectionsCarIcon }],
  [{ title: 'Hipotecas', icon: ApartmentIcon }],
  [{ title: 'Agrícola', icon: GrassIcon }],
]

const CollateralsPage = () => {
  return (
    <PageRouterLayout
      title="Garantías"
      options={[buildPageLayoutCreateOption('/collaterals/create')]}
      routerConfig={{
        baseBreadcrumbs: [collateralsBreadcrumb],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Todos</Tab>
          <Tab index={1}>Vehículos</Tab>
          <Tab index={2}>Hipotecas</Tab>
          <Tab index={3}>Agrícola</Tab>
          <Tab index={4}>Inventario</Tab>
        </TabsList>
        <TabPanel index={0}>
          <CollateralDataTable />
        </TabPanel>
        <TabPanel index={1}>
          <CollateralDataTable
            initialQuery={{ type: collateralTypeMap.carLoan }}
            initialState={{ columnVisibility: { type: false } }}
          />
        </TabPanel>
        <TabPanel index={2}>
          <CollateralDataTable
            initialQuery={{ type: collateralTypeMap.agriculturalLoan }}
            initialState={{ columnVisibility: { type: false } }}
          />
        </TabPanel>
        <TabPanel index={3}>
          <CollateralDataTable
            initialQuery={{ type: collateralTypeMap.agriculturalLoan }}
            initialState={{ columnVisibility: { type: false } }}
          />
        </TabPanel>
        <TabPanel index={4}>
          <CollateralDataTable
            initialQuery={{ isActive: false }}
            initialState={{ columnVisibility: { type: false } }}
          />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default CollateralsPage
