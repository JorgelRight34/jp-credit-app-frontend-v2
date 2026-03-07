import z from "zod";

export const reportGenerationFormSchema = z.object({
    file: z.file().array().min(1),
    key: z.string(),
    id: z.union([z.string(), z.number()])
})

export type ReportGenerationFormValues = z.infer<typeof reportGenerationFormSchema>;