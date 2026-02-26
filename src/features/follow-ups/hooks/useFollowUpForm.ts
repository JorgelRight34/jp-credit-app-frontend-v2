import { UseDataFormProps, useForm } from "@/components";
import { FollowUp } from "../models/followUp";
import { followUpFormSchema, FollowUpFormValues } from "../lib/schemas/followUpFormSchema";
import { createFollowUp, updateFollowUp } from "../services/followUpClient";
import { followUpsQueryKey } from "../lib/query-keys";

interface UseFollowUpFormProps extends UseDataFormProps<FollowUp, FollowUpFormValues> {
    followUpId?: number;
}

export const useFollowUpForm = ({ followUpId, initialValues, ...props }: UseFollowUpFormProps) => {
    return useForm({
        schema: followUpFormSchema,
        defaultValues: initialValues ?? { title: "", body: "", loanId: "" },
        onSubmit: createFollowUp,
        onEdit: (body) => updateFollowUp(followUpId!, body),
        keysToInvalidate: [[followUpsQueryKey]],
        ...props
    })
}