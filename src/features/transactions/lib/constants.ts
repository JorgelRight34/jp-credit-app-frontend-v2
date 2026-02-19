import { SelectOptions } from "@/components"
import { TransactionType } from "../models/transactionType"

export const transactionsQueryKey = "transactions"

export const transactionSelectOptions: SelectOptions<TransactionType> = [
    ['pc', 'Pago de cuota'],
    ['ds', 'Desembolso'],
]