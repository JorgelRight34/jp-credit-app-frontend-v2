import z from "zod";

export const loanEditFormSchema = z.object({
    description: z.string().max(100).optional(),
    loanPurposeId: z.number().min(1).optional()
})

export type LoanEditFormValues = z.infer<typeof loanEditFormSchema>;