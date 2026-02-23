import { UseDataFormProps, useForm } from "@/components"
import { transactionFormSchema, TransactionFormValues } from "../lib/schemas/transactionFormSchema"
import { Project } from "@/features/projects"
import { Transaction } from "../models/transaction"
import { createPayment } from "../services/transactionClient"
import { transactionsQueryKey } from "../lib/constants"
import { getTodayAsInputDate } from "@/lib/utils"

interface UseTransactionFormProps extends UseDataFormProps<Transaction, TransactionFormValues> {
    project: Project
}

export const useTransactionForm = ({ project, initialValues }: UseTransactionFormProps) => {
    return useForm({
        schema: transactionFormSchema,
        defaultValues: {
            amount: "",
            type: initialValues?.type ?? "",
            loanId: null,
            payerId: null,
            date: getTodayAsInputDate(),
            penaltyRate: project.defaultPenaltyRate,
            description: '',
            daysOfGrace: project.graceDays
        },
        onSubmit: createPayment,
        keysToInvalidate: [[transactionsQueryKey]],
    })
}