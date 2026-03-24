import z from "zod";

export const loanCreateFormSchema = z
    .object({
        approvedAmount: z.preprocess(
            (val) => Number(val),
            z.number().positive("Debe ser positivo.")
        ),
        description: z.string(),
        graceDays: z.number(),
        annualInterestRate: z.union([
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
        loanOfficerProfileId: z.number().optional(),
        guarantorProfileId: z.number().optional(),
        projectId: z.number(),
        loanPurposeId: z.number().min(1),
        clientProfileId: z.union([
            z
                .object({
                    value: z.number(),
                    label: z.string(),
                })
                .transform((val) => val.value),
            z.number(),
        ]),
    })
    .superRefine(({ guarantorProfileId, clientProfileId, loanOfficerProfileId }, ctx) => {
        if (!guarantorProfileId) return;

        if (guarantorProfileId === clientProfileId) {
            ctx.addIssue({
                code: "custom",
                message: "El garante no puede ser el mismo cliente.",
                path: ["guarantorProfileId"],
            });
        }

        if (
            loanOfficerProfileId &&
            guarantorProfileId === loanOfficerProfileId
        ) {
            ctx.addIssue({
                code: "custom",
                message: "El garante no puede ser el oficial del préstamo.",
                path: ["guarantorProfileId"],
            });
        }
    });

export type LoanCreateFormValues = z.infer<typeof loanCreateFormSchema>;