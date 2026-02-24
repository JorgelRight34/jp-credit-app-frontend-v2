import { UseDataFormProps, useForm } from "@/components"
import { ClosedPeriodFormValues, closePeriodFormSchema } from "../lib/schemas/closePeriodFormSchema"
import { closePeriod } from "../services/transactionClient"
import { ClosedPeriod } from "../models/accountingPeriod"

export const useClosePeriodForm = (config: UseDataFormProps<ClosedPeriod, ClosedPeriodFormValues>) => {
    return useForm({
        schema: closePeriodFormSchema,
        defaultValues: { endDate: '' },
        onSubmit: closePeriod,
        ...config
    })
}