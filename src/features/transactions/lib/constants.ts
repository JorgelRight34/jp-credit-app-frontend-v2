import { SelectOptions } from "@/components"
import { TransactionType } from "../models/transactionType"
import { Report } from "@/features/reports"

export const transactionsQueryKey = "transactions"

export const accountingPeriodsQueryKey = "closed-periods"

export const transactionSelectOptions: SelectOptions<TransactionType> = [
    ['pc', 'Pago de cuota'],
    ['ds', 'Desembolso'],
]

export const transactionReceiptReportKeyParts: { key: Report["key"]; buildSubkey: ((type: TransactionType) => string) } = {
    key: 'Transaction',
    buildSubkey: (type) => `receipt.${type}`,
}