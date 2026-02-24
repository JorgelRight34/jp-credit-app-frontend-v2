import {
  BreadcrumbsByRoute,
  CalendarMonthIcon,
  CollateralIcon,
  buildPageLayoutMenuOption,
  buildPageLayoutSettingsOption,
  CreditCardIcon,
  DataTable,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'
import { Loan } from '../models/loan'
import { loanPermissionProvider } from '../lib/config/permission-provider'
import { buildLoanBreadcrumb, loanBreadcrumb } from '../lib/config/breadcrumb'
import LoanOverview from '../components/loan-overview'
import LoanAmortizationPreview from '../components/loan-amortization-preview'
import { collateralsDataTableConfig } from '@/features/collaterals'
import { loansQueryKey } from '../lib/constants'
import { buildLoanLabel } from '../lib/utils'
import { useRouter } from '@/hooks/useRouter'
import { PropsWithChildren } from 'react'
import { overviewBreadcrumb } from '@/lib/constants'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: [overviewBreadcrumb],
  amortization: [{ title: 'Amortización', icon: CalendarMonthIcon }],
  transactions: [{ title: 'Transacciones', icon: CreditCardIcon }],
  adjustmentNotes: [{ title: 'Notas', icon: CreditCardIcon }],
  collaterals: [{ title: 'Garantías', icon: CollateralIcon }],
}

const LoanPage = ({ loan }: { loan: Loan }) => {
  return (
    <LoanPageRouterLayout loan={loan}>
      <TabsRouter>
        <Tab eventKey="overview" title="Resumen">
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
    </LoanPageRouterLayout>
  )
}

const LoanPageRouterLayout = ({
  loan,
  children,
}: { loan: Loan } & PropsWithChildren) => {
  const router = useRouter()

  return (
    <PageRouterLayout
      title={buildLoanLabel(loan)}
      permissionProvider={loanPermissionProvider}
      options={[
        buildPageLayoutMenuOption([
          {
            label: 'Pagar cuota',
            onClick: () =>
              router.navigate({
                to: '/transactions/create',
                search: { tab: 'pay', loanId: loan.id },
              }),
          },
          {
            label: 'Hacer desembolso',
            onClick: () =>
              router.navigate({
                to: '/transactions/create',
                search: { tab: 'disburse', loanId: loan.id },
              }),
          },
        ]),
        buildPageLayoutSettingsOption('/loans/$id/settings', {
          id: loan.id.toString(),
        }),
      ]}
      routerConfig={{
        defaultActive: 'overview',
        baseBreadcrumbs: [loanBreadcrumb, buildLoanBreadcrumb(loan)],
        breadcrumbsByRoute,
      }}
    >
      {children}
    </PageRouterLayout>
  )
}

export default LoanPage
