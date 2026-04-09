import CollateralDataTable from '../components/collateral-datatable'
import { collateralTypeMap } from '../models/collateralType'
import type { BreadcrumbsByRoute, BreadcrumbSpec } from '@/components'
import {
  AllIcon,
  ApartmentIcon,
  CollateralIcon,
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

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ title: 'Todos', icon: AllIcon }],
  [{ title: 'Inventario', icon: InventoryIcon }],
  [{ title: 'Vehículos', icon: DirectionsCarIcon }],
  [{ title: 'Hipotecas', icon: ApartmentIcon }],
  [{ title: 'Agrícola', icon: GrassIcon }],
]

export const collateralsBreadcrumb: BreadcrumbSpec = {
  title: 'Garantías',
  icon: CollateralIcon,
  pathname: '/collaterals',
}

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
