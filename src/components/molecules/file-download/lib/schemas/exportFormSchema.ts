import z from "zod";

export const exportFormSchema = z
    .object({
        format: z.string(),
        initialPage: z.coerce.number().int().min(1),
        endPage: z.coerce.number().int().min(1),
        limit: z.coerce.number().int().min(1),
    })
    .superRefine(({ initialPage, endPage }, ctx) => {
        if (endPage <= initialPage) {
            ctx.addIssue({
                code: "custom",
                message: "La página hast debe ser mayor a la inicial",
                path: ["endPage"],
            });
        }
    });
export type ExportFormValues = z.infer<typeof exportFormSchema>