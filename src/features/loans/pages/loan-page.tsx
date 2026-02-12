import {
  BreadcrumbsByRoute,
  LoanIcon,
  OverviewIcon,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'
import { Loan } from '../models/loan'
import { loanPermissionProvider } from '../lib/config/permission-provider'
import { loanBreadcrumb } from '../lib/config/breadcrumb'
import LoanOverview from '../components/loan-overview'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: { title: 'Overview', icon: OverviewIcon },
}

const LoanPage = ({ loan }: { loan: Loan }) => {
  return (
    <PageRouterLayout
      title={`Préstamo No. ${loan.id}`}
      permissionProvider={loanPermissionProvider}
      routerConfig={{
        defaultActive: 'overview',
        baseBreadcrumbs: [
          loanBreadcrumb,
          { title: `Préstamo No.#${loan.id}`, icon: LoanIcon },
        ],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="overview" title="Overview">
          <LoanOverview loan={loan} />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default LoanPage
