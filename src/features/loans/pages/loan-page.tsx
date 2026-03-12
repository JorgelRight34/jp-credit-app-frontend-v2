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
  BreadcrumbSpec,
  LoanIcon,
  TabsList,
  TabPanel,
} from '@/components'
import { Loan } from '../models/loan'
import LoanOverview from '../components/loan-overview'
import LoanAmortizationPreview from '../components/loan-amortization-preview'
import { collateralDataTableConfig } from '@/features/collaterals'
import { loansQueryKey } from '../lib/constants'
import { buildLoanLabel } from '../lib/utils'
import { useRouter } from '@/hooks/useRouter'
import { PropsWithChildren } from 'react'
import { overviewBreadcrumb } from '@/lib/constants'
import { loanModuleBreadcrumb } from './loans-page'

export const buildLoanBreadcrumb = (loan: Loan): BreadcrumbSpec => ({
  title: `Préstamo No.#${loan.id}`,
  icon: LoanIcon,
  pathname: '/loans/$id',
  params: { id: loan.id.toString() },
})

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [overviewBreadcrumb],
  [{ title: 'Amortización', icon: CalendarMonthIcon }],
  [{ title: 'Transacciones', icon: CreditCardIcon }],
  [{ title: 'Notas', icon: CreditCardIcon }],
  [{ title: 'Garantías', icon: CollateralIcon }],
]

const LoanPage = ({ loan }: { loan: Loan }) => {
  return (
    <LoanPageRouterLayout loan={loan}>
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Resumen</Tab>
          <Tab index={1}>Amortización</Tab>
          <Tab index={2}>Transacciones</Tab>
          <Tab index={3}>Notas</Tab>
          <Tab index={4}>Garantías</Tab>
        </TabsList>
        <TabPanel index={0}>
          <LoanOverview loan={loan} />
        </TabPanel>
        <TabPanel index={1}>
          <LoanAmortizationPreview
            calculationInput={{
              principalBalance: loan.approvedAmount,
              annualInterestRate: loan.annualInterestRate,
              paymentFrequency: loan.paymentFrequency,
              numberOfPayments: loan.numberOfPayments,
            }}
            startDate={loan.startDate}
          />
        </TabPanel>
        <TabPanel index={2}></TabPanel>
        <TabPanel index={3}></TabPanel>
        <TabPanel index={4}>
          <DataTable
            query={{ loanId: loan.id }}
            initialState={{ columnVisibility: { loanId: false } }}
            cacheKey={[loansQueryKey, 'collaterals', loan.id]}
            {...collateralDataTableConfig}
          />
        </TabPanel>
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
        baseBreadcrumbs: [loanModuleBreadcrumb, buildLoanBreadcrumb(loan)],
        breadcrumbsByRoute,
      }}
    >
      {children}
    </PageRouterLayout>
  )
}

export default LoanPage
