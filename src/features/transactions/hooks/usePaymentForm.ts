import { UseDataFormProps, useForm } from "@/components"
import { paymentFormSchema, PaymentFormValues } from "../lib/schemas/paymentFormSchema"
import { Project } from "@/features/projects"
import { Transaction } from "../models/transaction"
import { createPayment } from "../services/transactionClient"
import { transactionsQueryKey } from "../lib/constants"
import { getTodayAsInputDate } from "@/lib/utils"

interface UsePaymentFormProps extends UseDataFormProps<Transaction, PaymentFormValues> {
    project: Project
}

export const usePaymentForm = ({ project, defaultValues, ...config }: UsePaymentFormProps) => {
    return useForm({
        schema: paymentFormSchema,
        defaultValues: {
            amount: "",
            loanId: null,
            payerId: null,
            date: getTodayAsInputDate(),
            penaltyRate: project.defaultPenaltyRate,
            description: '',
            daysOfGrace: project.graceDays,
            ...defaultValues
        },
        onSubmit: createPayment,
        keysToInvalidate: [[transactionsQueryKey]],
        ...config,
    })
}