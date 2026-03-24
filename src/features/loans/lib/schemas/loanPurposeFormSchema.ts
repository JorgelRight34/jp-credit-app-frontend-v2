import z from "zod";

export const loanPurposeFormSchema = z.object({ name: z.string().max(100) })

export type LoanPurposeFormValues = z.infer<typeof loanPurposeFormSchema>;