import {
  AccountStatementsIcon,
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  ClientIcon,
  GuarantorIcon,
  PageRouterLayout,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'
import ClientAccountStatementsDataTable from '../components/client-account-statements-datatable'
import GuarantorAccountStatementsDataTable from '../components/guarantor-account-statements-datatable'

const breadcrumb: BreadcrumbSpec = {
  title: 'Estados de cuenta',
  icon: AccountStatementsIcon,
}

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ title: 'Clientes', icon: ClientIcon }],
  [{ title: 'Garantes', icon: GuarantorIcon }],
]

const AccountStatementsPage = () => {
  return (
    <PageRouterLayout
      title="Estados de cuenta"
      routerConfig={{
        baseBreadcrumbs: [breadcrumb],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Clientes</Tab>
          <Tab index={1}>Garantes</Tab>
        </TabsList>
        <TabPanel index={0}>
          <ClientAccountStatementsDataTable />
        </TabPanel>
        <TabPanel index={1}>
          <GuarantorAccountStatementsDataTable />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default AccountStatementsPage
