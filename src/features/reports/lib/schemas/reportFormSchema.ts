import z from "zod";

export const reportFormSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    subkey: z.string().optional(),
})

export type ReportFormValues = z.infer<typeof reportFormSchema>;