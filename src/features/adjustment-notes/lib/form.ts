import { FormProvider } from "@/components/EntityForm/models/formProvider";
import { AdjustmentNote } from "../models/adjusment-note";
import { z } from "zod";
import { adjustmentNoteTypes } from "./constants";

export const adjustmentNoteFormProvider: FormProvider<AdjustmentNote> = {
    schema: z.object({
        type: z.string(),
        amount: z.number(),
        loanId: z.number(),
        description: z.string()
    }),
    fields: [
        { id: "type", name: "type", type: "select", label: "Tipo", options: [[adjustmentNoteTypes.NC, "Crédito"], [adjustmentNoteTypes.ND, "Débito"]] },
        { id: "amount", name: "amount", type: "currency", label: "Monto" },
        { id: "loanId", name: "loanId", label: "Préstamo", type: "loan" },
        { id: "description", name: "description", label: "Descripción", type: "textarea", rows: 4 }
    ]
}

export type AdjustmentNoteFormValues = z.infer<typeof adjustmentNoteFormProvider.schema>;