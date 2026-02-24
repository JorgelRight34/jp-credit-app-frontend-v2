import z from "zod";

export const disbursementFormSchema = z.object({
    loanId: z.number(),
    amount: z.number(),
    date: z.string(),
    description: z.string()
})

export type DisbursementFormValues = z.infer<typeof disbursementFormSchema>;