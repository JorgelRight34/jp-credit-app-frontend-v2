import z from "zod";

export const exportFormSchema = z.object({
    format: z.string(),
    pageStart: z.union([z.string(), z.number()]).transform(val => +val),
    pageEnd: z.union([z.string(), z.number()]).transform(val => +val),
    limit: z.union([z.string(), z.number()]).transform(val => +val),
})
    .refine(
        (data) => +data.pageStart > +data.pageEnd,
        {
            message: "La página final debe ser mayor a la inicial",
            path: ["pageStart"], // attach error to specific field
        }
    );

export type ExportFormValues = z.infer<typeof exportFormSchema>