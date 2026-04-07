import { CollateralSearchInput } from '@/features/collaterals'
import { LoanSearchInput } from '@/features/loans'
import { TransactionSearchInput } from '@/features/transactions'
import { Report } from '../models/report'
import { InputElement, PickerInputElement } from '@/components'

export const reportTemplateKeysInputMapAside: Record<
  Report['key'],
  InputElement
> = {
  Loan: (p) => <LoanSearchInput {...p} />,
  Collateral: (p) => <CollateralSearchInput {...p} />,
  Transaction: (p) => <TransactionSearchInput {...p} />,
}

export const reportTemplateKeysInputMap =
  reportTemplateKeysInputMapAside as Record<Report['key'], PickerInputElement>
