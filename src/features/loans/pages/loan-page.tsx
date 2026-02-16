import {
  BreadcrumbsByRoute,
  CalendarMonthIcon,
  CollateralIcon,
  createPageLayoutSettingsOption,
  CreditCardIcon,
  DataTable,
  OverviewIcon,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'
import { Loan } from '../models/loan'
import { loanPermissionProvider } from '../lib/config/permission-provider'
import { createLoanBreadcrumb, loanBreadcrumb } from '../lib/config/breadcrumb'
import LoanOverview from '../components/loan-overview'
import LoanAmortizationPreview from '../components/loan-amortization-preview'
import { collateralsDataTableConfig } from '@/features/collaterals'
import { loansQueryKey } from '../lib/constants'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: { title: 'Overview', icon: OverviewIcon },
  amortization: { title: 'Amortización', icon: CalendarMonthIcon },
  transactions: { title: 'Transacciones', icon: CreditCardIcon },
  adjustmentNotes: { title: 'Notas', icon: CreditCardIcon },
  collaterals: { title: 'Garantías', icon: CollateralIcon },
}

const LoanPage = ({ loan }: { loan: Loan }) => {
  return (
    <PageRouterLayout
      title={`Préstamo No. ${loan.id}`}
      permissionProvider={loanPermissionProvider}
      options={[
        createPageLayoutSettingsOption('/loans/$id/settings', {
          id: loan.id.toString(),
        }),
      ]}
      routerConfig={{
        defaultActive: 'overview',
        baseBreadcrumbs: [loanBreadcrumb, createLoanBreadcrumb(loan)],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="overview" title="Overview">
          <LoanOverview loan={loan} />
        </Tab>
        <Tab eventKey="amortization" title="Amortización">
          <LoanAmortizationPreview
            calculationInput={{
              principalBalance: loan.approvedAmount,
              annualInterestRate: loan.annualInterestRate,
              paymentFrequency: loan.paymentFrequency,
              numberOfPayments: loan.numberOfPayments,
            }}
            startDate={loan.startDate}
          />
        </Tab>
        <Tab eventKey="transactions" title="Transacciones"></Tab>
        <Tab eventKey="adjustmentNotes" title="Ajustes"></Tab>
        <Tab eventKey="collaterals" title="Garantías">
          <DataTable
            query={{ loanId: loan.id }}
            initialState={{ columnVisibility: { loanId: false } }}
            cacheKey={[loansQueryKey, 'collaterals', loan.id]}
            {...collateralsDataTableConfig}
          />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default LoanPage
