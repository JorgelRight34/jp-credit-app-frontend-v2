import {
  AccountStatementsIcon,
  AllIcon,
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  ClientIcon,
  DataTableContainer,
  GuarantorIcon,
  PageRouterLayout,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'
import {
  accountStatementSearchConfig,
  clientAccountStatementSearchConfig,
  guarantorAccountStatementSearchConfig,
} from '../lib/config/account-statement-search-config'
import { accountStatementDataTableConfig } from '../lib/config/account-statement-datatable-config'
import { accountStatementsQueryKey } from '../lib/query-keys'
import { clientAccountStatementDataTableConfig } from '../lib/config/client-account-statements-datatable-config'

const breadcrumb: BreadcrumbSpec = {
  title: 'Estados de cuenta',
  icon: AccountStatementsIcon,
}

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ title: 'Todos', icon: AllIcon }],
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
          <Tab index={0}>Todos</Tab>
          <Tab index={1}>Clientes</Tab>
          <Tab index={2}>Garantes</Tab>
        </TabsList>
        <TabPanel index={0}>
          <DataTableContainer
            searchConfig={accountStatementSearchConfig}
            datatableConfig={accountStatementDataTableConfig}
            cacheKey={[accountStatementsQueryKey]}
          />
        </TabPanel>
        <TabPanel index={1}>
          <DataTableContainer
            searchConfig={clientAccountStatementSearchConfig}
            datatableConfig={clientAccountStatementDataTableConfig}
            cacheKey={[accountStatementsQueryKey, 'clients']}
          />
        </TabPanel>
        <TabPanel index={2}>
          <DataTableContainer
            searchConfig={guarantorAccountStatementSearchConfig}
            datatableConfig={accountStatementDataTableConfig}
            cacheKey={[accountStatementsQueryKey, 'guarantors']}
          />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default AccountStatementsPage
