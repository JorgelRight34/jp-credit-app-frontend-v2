import {
  BreadcrumbSpec,
  CalculateIcon,
  PageLayout,
  PageLayoutBreadcrumb,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import AmortizationDataTable from '../components/amortization-datatable'

const breadcrumbs: Array<BreadcrumbSpec> = [
  { title: 'Amortizaciones', icon: CalculateIcon },
  { title: 'Calculadora', icon: CalculateIcon },
]

const AmortizationsPage = () => {
  return (
    <PageLayout
      title="Amortizaciones"
      breadcrumb={<PageLayoutBreadcrumb breadcrumbs={breadcrumbs} />}
    >
      <Tabs>
        <TabsList>
          <Tab index={0}>Calculadora</Tab>
        </TabsList>
        <TabPanel index={0}>
          <AmortizationDataTable />
        </TabPanel>
      </Tabs>
    </PageLayout>
  )
}

export default AmortizationsPage
