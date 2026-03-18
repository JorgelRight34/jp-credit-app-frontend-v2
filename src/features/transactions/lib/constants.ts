import { SelectOptions } from "@/components"
import { TransactionType } from "../models/transactionType"

export const transactionsQueryKey = "transactions"

export const accountingPeriodsQueryKey = "closed-periods"

export const transactionSelectOptions: SelectOptions<TransactionType> = [
    ['pc', 'Pago de cuota'],
    ['ds', 'Desembolso'],
]

export const transactionReceiptReportKeyParts = {
    key: 'transaction',
    buildSubkey: (type: TransactionType) => `receipt.${type}`,
}