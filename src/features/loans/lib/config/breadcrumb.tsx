import { BreadcrumbSpec, LoanIcon, MailIcon } from '@/components'
import { Loan } from '../../models/loan'

export const loanBreadcrumb: BreadcrumbSpec = {
  title: 'Préstamos',
  icon: MailIcon,
  pathname: '/loans',
}

export const buildLoanBreadcrumb = (loan: Loan): BreadcrumbSpec => ({
  title: `Préstamo No.#${loan.id}`,
  icon: LoanIcon,
  pathname: '/loans/$id',
  params: { id: loan.id.toString() },
})
