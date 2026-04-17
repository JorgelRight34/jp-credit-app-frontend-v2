import { createPickerContext } from '@/components'
import { Loan } from '../models/loan'

export const [LoanSelectionProvider, useEmitLoan, useSelectedLoan] =
  createPickerContext<Loan>()
