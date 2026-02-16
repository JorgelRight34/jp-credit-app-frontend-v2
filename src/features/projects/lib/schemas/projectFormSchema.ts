import z from "zod";

export const projectFormSchema = z.object({
    name: z.string(),
    graceDays: z.number(),
    defaultPenaltyRate: z.number()
})

export type ProjectFormValues = z.infer<typeof projectFormSchema>;