import z from "zod";

export const paymentFormSchema = z.object({
    amount: z.string().transform((val) => Number(val)),
    loanId: z.number(),
    payerId: z.number(),
    date: z.string(),
    penaltyRate: z.number().optional(),
    description: z.string().optional(),
    daysOfGrace: z.number().optional(),
})

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;