import {
  BreadcrumbsByRoute,
  CalculateIcon,
  LoanIcon,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'
import AmortizationDataTable from '../components/amortization-datatable'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  calculator: [{ title: 'Calculadora', icon: CalculateIcon }],
  loan: [{ title: 'Préstamos', icon: LoanIcon }],
}

const AmortizationsPage = () => {
  return (
    <PageRouterLayout
      title="Amortizaciones"
      routerConfig={{
        defaultActive: 'calculator',
        baseBreadcrumbs: [{ title: 'Amortizaciones', icon: CalculateIcon }],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="calculator" title="Calculadora">
          <AmortizationDataTable />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default AmortizationsPage
