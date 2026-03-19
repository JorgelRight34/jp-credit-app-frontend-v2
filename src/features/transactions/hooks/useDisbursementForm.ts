import { UseDataFormProps, useForm } from "@/components"
import { disbursementFormSchema, DisbursementFormValues } from "../lib/schemas/disbursementFormSchema"
import { createDisbursement } from "../services/transactionClient"
import { Disbursement } from "../models/disbursement"
import { transactionsQueryKey } from "../lib/constants"

export const useDisbursementForm = ({
    defaultValues,
    ...config
}: UseDataFormProps<Disbursement, DisbursementFormValues>) => {
    return useForm({
        schema: disbursementFormSchema,
        defaultValues: {
            loanId: null,
            amount: '',
            description: '',
            ...defaultValues
        },
        onSubmit: createDisbursement,
        keysToInvalidate: [[transactionsQueryKey]],
        ...config
    })
}