import z from "zod";

export const loanFormSchema = z
    .object({
        approvedAmount: z.preprocess(
            (val) => Number(val),
            z.number().positive("Debe ser positivo.")
        ),
        description: z.string(),
        interestRate: z.union([
            z.string().transform((val) => Number(val)),
            z.number(),
        ]),
        numberOfPayments: z.union([
            z
                .string()
                .transform((val) => Number(val))
                .refine((val) => val > 0, { message: "Debe ser mayor que 0" })
                .refine((val) => val < 1000, { message: "Demasiadas cuotas" }),
            z.number(),
        ]),
        paymentFrequency: z.union([
            z
                .string()
                .transform((val) => Number(val))
                .refine((val) => val > 0, { message: "Debe ser mayor que 0" }),
            z.number(),
        ]),
        startDate: z.string().default(new Date().toISOString()),
        deliveryDate: z.string(),
        loanOfficerId: z.number().optional(),
        guarantorId: z.number().optional(),
        projectId: z.number(),
        clientId: z.union([
            z
                .object({
                    value: z.number(),
                    label: z.string(),
                })
                .transform((val) => val.value),
            z.number(),
        ]),
        status: z.string(),
        annualInterestRate: z.number().optional(),
    });

export type LoanFormValues = z.infer<typeof loanFormSchema>;