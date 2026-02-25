import z from "zod";

export const adjustmentNoteFormSchema = z.object({
    type: z.string(),
    description: z.string().optional(),
    amount: z.string(),
    loanId: z.number()
});

export type AdjustmentNoteFormValues = z.infer<typeof adjustmentNoteFormSchema>;