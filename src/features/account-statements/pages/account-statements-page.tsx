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

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  all: [{ title: 'Todos', icon: AllIcon }],
  clients: [{ title: 'Clientes', icon: ClientIcon }],
  guarantors: [{ title: 'Garantes', icon: GuarantorIcon }],
}

const AccountStatementsPage = () => {
  return (
    <PageRouterLayout
      title="Estados de cuenta"
      routerConfig={{
        defaultActive: 'all',
        baseBreadcrumbs: [breadcrumb],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="all" title="Todos">
          <DataTableContainer
            searchConfig={accountStatementSearchConfig}
            datatableConfig={accountStatementDataTableConfig}
            cacheKey={[accountStatementsQueryKey]}
          />
        </Tab>
        <Tab eventKey="clients" title="Clientes">
          <DataTableContainer
            searchConfig={clientAccountStatementSearchConfig}
            datatableConfig={clientAccountStatementDataTableConfig}
            cacheKey={[accountStatementsQueryKey, 'clients']}
          />
        </Tab>
        <Tab eventKey="guarantors" title="Garantes">
          <DataTableContainer
            searchConfig={guarantorAccountStatementSearchConfig}
            datatableConfig={accountStatementDataTableConfig}
            cacheKey={[accountStatementsQueryKey, 'guarantors']}
          />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default AccountStatementsPage
