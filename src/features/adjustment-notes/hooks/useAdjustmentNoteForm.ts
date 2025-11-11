import { UseEntityModuleFormProps } from "@/components/EntityForm/models/UseEntityModuleFormProps";
import { AdjustmentNote } from "../models/adjusment-note";
import { adjustmentNoteFormProvider, AdjustmentNoteFormValues } from "../lib/form";
import { UseEntityFormReturn } from "@/models";
import { createNote } from "../services/adjustmentNoteClient";

type UseAdjustmentNoteFormProps = UseEntityModuleFormProps<AdjustmentNote, AdjustmentNoteFormValues>;

// eslint-disable-next-line no-empty-pattern
export const useAdjustmentNoteForm = ({ }: UseAdjustmentNoteFormProps = {}): UseEntityFormReturn<AdjustmentNote, AdjustmentNoteFormValues> => {
    const onSubmit = async (data: AdjustmentNoteFormValues) => {
        const note = await createNote(data);
        return note;
    }

    return { onSubmit, config: { formProvider: adjustmentNoteFormProvider, cacheKeysToInvalidate: [] } }
}