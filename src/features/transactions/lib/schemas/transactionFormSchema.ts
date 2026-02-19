import z from "zod";

export const transactionFormSchema = z.object({
    value: z.string().transform((val) => Number(val)),
    type: z.string(),
    loanId: z.number(),
    payerId: z.union([
        z
            .object({ value: z.string(), label: z.string() })
            .transform((val) => val.value),
        z.string(),
    ]),
    date: z.string().default(new Date().toISOString()),
    penaltyRate: z.number().optional(),
    description: z.string().optional(),
    daysOfGrace: z.number().optional(),
})

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;