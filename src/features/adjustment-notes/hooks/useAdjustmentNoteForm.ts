import { UseDataFormProps, useForm } from "@/components"
import { adjustmentNoteFormSchema, AdjustmentNoteFormValues } from "../lib/schemas/adjustmentNoteFormSchema"
import { AdjustmentNote } from "../models/adjustmentNote"
import { createAdjustmentNote } from "../services/adjustmentNoteClient"
import { adjustmentNoteQueryKey } from "../lib/query-keys"

interface UseAdjustmentNoteFormProps extends UseDataFormProps<AdjustmentNote, AdjustmentNoteFormValues> { }

export const useAdjustmentNoteForm = ({ initialValues, ...props }: UseAdjustmentNoteFormProps) => {
    return useForm({
        schema: adjustmentNoteFormSchema,
        defaultValues: { type: initialValues?.type ?? "pc", description: null, amount: '', loanId: null },
        onSubmit: createAdjustmentNote,
        keysToInvalidate: [[adjustmentNoteQueryKey]],
        ...props
    })
}