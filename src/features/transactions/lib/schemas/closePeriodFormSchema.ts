import z from "zod";

export const closePeriodFormSchema = z.object({
    endDate: z.string()
})

export type ClosedPeriodFormValues = z.infer<typeof closePeriodFormSchema>;