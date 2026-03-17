import { UseDataFormProps, useForm } from "@/components"
import { disbursementFormSchema, DisbursementFormValues } from "../lib/schemas/disbursementFormSchema"
import { createDisbursement } from "../services/transactionClient"
import { Disbursement } from "../models/disbursement"
import { transactionsQueryKey } from "../lib/constants"

export const useDisbursementForm = ({
    initialValues,
    ...config
}: UseDataFormProps<Disbursement, DisbursementFormValues>) => {
    return useForm({
        schema: disbursementFormSchema,
        defaultValues: {
            loanId: null,
            amount: '',
            description: '',
            ...initialValues
        },
        onSubmit: createDisbursement,
        keysToInvalidate: [[transactionsQueryKey]],
        ...config
    })
}