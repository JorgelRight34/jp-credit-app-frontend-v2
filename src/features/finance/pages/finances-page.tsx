import {
  DisbursementIcon,
  FInanceIcon,
  PageRouterLayout,
  PaymentIcon,
  Tab,
  TabsRouter,
} from '@/components'
import { financePermissionProvider } from '../lib/config/permission-provider'
import IncomesSection from '../components/incomes-section'
import ExpensesSection from '../components/expenses-section'

const breadcrumbsByRoute = {
  projections: [{ title: 'Proyecciones', icon: FInanceIcon }],
  incomes: [{ title: 'Ingresos', icon: PaymentIcon }],
  expenses: [{ title: 'Egresos', icon: DisbursementIcon }],
}

const FinancesPage = () => {
  return (
    <PageRouterLayout
      title="Finanzas"
      permissionProvider={financePermissionProvider}
      routerConfig={{
        defaultActive: 'projections',
        baseBreadcrumbs: [{ title: 'Finanzas', icon: FInanceIcon }],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="projections" title="Proyecciones">
          ...
        </Tab>
        <Tab eventKey="incomes" title="Ingresos">
          <IncomesSection />
        </Tab>
        <Tab eventKey="expenses" title="Egresos">
          <ExpensesSection />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default FinancesPage
