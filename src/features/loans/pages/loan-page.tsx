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
import { buildLoanLabel, buildLoanLabelById } from '../lib/utils'
import { overviewBreadcrumb } from '@/lib/constants'
import { loanModuleBreadcrumb } from './loans-page'
import { TransactionDataTable } from '@/features/transactions'
import { AdjustmentNoteDataTable } from '@/features/adjustment-notes'
import { loansQueryKey } from '../lib/query-keys'
import { changeHistoryLinkLabel } from '@/features/audit'

export const buildLoanBreadcrumb = (loan: Loan): BreadcrumbSpec => ({
  title: buildLoanLabelById(loan.id),
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
    <PageRouterLayout
      title={buildLoanLabel(loan)}
      options={[
        buildPageLayoutMenuOption([
          {
            label: 'Pagar cuota',
            to: '/transactions/create',
            search: { tab: 0, loanId: loan.id },
          },
          {
            label: 'Hacer desembolso',
            to: '/transactions/create',
            search: { tab: 1, loanId: loan.id },
          },
          {
            label: changeHistoryLinkLabel,
            to: '/loans/$id/changes',
            params: { id: loan.id.toString() },
          },
        ]),
        buildPageLayoutSettingsOption('/loans/$id/settings', {
          id: loan.id.toString(),
        }),
      ]}
      smallScreenExtraMenuOptions={[
        {
          label: 'Pagar cuota',
          to: '/transactions/create',
          search: { tab: 0, loanId: loan.id },
        },
        {
          label: 'Hacer desembolso',
          to: '/transactions/create',
          search: { tab: 1, loanId: loan.id },
        },
      ]}
      routerConfig={{
        baseBreadcrumbs: [loanModuleBreadcrumb, buildLoanBreadcrumb(loan)],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Resumen</Tab>
          <Tab index={1}>Amortización</Tab>
          <Tab index={2}>Transacciones</Tab>
          <Tab index={3}>Garantías</Tab>
          <Tab index={4}>Notas</Tab>
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
        <TabPanel index={2}>
          <TransactionDataTable
            initialQuery={{ loanId: loan.id }}
            initialState={{ columnVisibility: { loanId: false } }}
          />
        </TabPanel>
        <TabPanel index={3}>
          <DataTable
            query={{ loanId: loan.id }}
            initialState={{ columnVisibility: { loanId: false } }}
            cacheKey={[loansQueryKey, 'collaterals', loan.id]}
            {...collateralDataTableConfig}
          />
        </TabPanel>
        <TabPanel index={4}>
          <AdjustmentNoteDataTable
            initialQuery={{ loanId: loan.id }}
            initialState={{ columnVisibility: { loanId: false } }}
          />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default LoanPage
