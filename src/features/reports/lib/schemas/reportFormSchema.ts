import z from "zod";

export const reportFormSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    key: z.string(),
    bookmark: z.boolean().optional(),
})

export type ReportFormValues = z.infer<typeof reportFormSchema>;