import z from "zod";

export const paymentFormSchema = z.object({
    amount: z.union([z.string(), z.number()]).transform((val) => Number(val)),
    loanId: z.number(),
    payer: z.string(),
    date: z.string(),
    penaltyRate: z.number().optional(),
    description: z.string().optional(),
    daysOfGrace: z.number().optional(),
})

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;