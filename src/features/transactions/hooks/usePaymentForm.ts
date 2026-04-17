import { UseDataFormProps, useForm } from "@/components"
import { paymentFormSchema, PaymentFormValues } from "../lib/schemas/paymentFormSchema"
import { Project } from "@/features/projects"
import { createPayment } from "../services/transactionClient"
import { transactionsQueryKey } from "../lib/constants"
import { getTodayAsInputDate } from "@/lib/utils"
import { PaymentResult } from "../models/paymentResult"
import { loansQueryKey } from "@/features/loans"

interface UsePaymentFormProps extends UseDataFormProps<PaymentResult, PaymentFormValues> {
    project: Project
}

export const usePaymentForm = ({ project, defaultValues, initialValues, ...config }: UsePaymentFormProps) => {
    return useForm({
        schema: paymentFormSchema,
        defaultValues: {
            amount: "",
            loanId: null,
            payer: "client",
            date: getTodayAsInputDate(),
            penaltyRate: project.defaultPenaltyRate,
            description: '',
            daysOfGrace: project.graceDays,
            ...initialValues,
            ...defaultValues
        },
        onSubmit: createPayment,
        keysToInvalidate: [[transactionsQueryKey, loansQueryKey]],
        ...config,
    })
}