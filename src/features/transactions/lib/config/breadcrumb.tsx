import { BreadcrumbSpec, ScheduleIcon, TransactionIcon } from '@/components'
import { Transaction } from '../../models/transaction'
import { buildTransactionLabel } from '../utils'

export const transactionBreadcrumb: BreadcrumbSpec = {
  icon: () => <TransactionIcon />,
  title: 'Transacciones',
  pathname: '/transactions',
}

export const closedPeriodBreadcrumb: BreadcrumbSpec = {
  title: 'Periodos contables',
  icon: ScheduleIcon,
  pathname: '/transactions/periods',
}

export const buildTransactionBreadcrumb = (
  transaction: Transaction,
): BreadcrumbSpec => ({
  title: buildTransactionLabel(transaction),
  icon: () => <TransactionIcon />,
  pathname: '/transactions/$id',
  params: { id: transaction.id.toString() },
})
