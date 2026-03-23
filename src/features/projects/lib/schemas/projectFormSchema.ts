import z from "zod";

export const projectFormSchema = z.object({
    name: z.string(),
    graceDays: z.union([z.string(), z.number()]).transform(el => +el),
    defaultPenaltyRate: z.number()
})

export type ProjectFormValues = z.infer<typeof projectFormSchema>;