import { AdjustmentNote } from "../models/adjusment-note";
import { adjustmentNoteFormProvider, AdjustmentNoteFormValues } from "../lib/form";
import { createNote } from "../services/adjustmentNoteClient";
import { UseEntityFormReturn, UseEntityModuleFormProps } from "@/components";
import { adjustmentNoteTag } from "../lib/constants";

type UseAdjustmentNoteFormProps = UseEntityModuleFormProps<AdjustmentNote, AdjustmentNoteFormValues>;

export const useAdjustmentNoteForm = ({ }: UseAdjustmentNoteFormProps = {}):
    UseEntityFormReturn<AdjustmentNote, AdjustmentNoteFormValues> => {
    const onSubmit = async (data: AdjustmentNoteFormValues) => {
        return await createNote(data);
    }

    return { onSubmit, config: { formProvider: adjustmentNoteFormProvider, cacheKeysToInvalidate: [], tagsToInvalidate: [adjustmentNoteTag] } }
}