import z from "zod";

export const collateralSellFormSchema = z.object({
    value: z.number(),
    description: z
        .string()
        .trim()
        .max(500, "La descripción no puede exceder 500 caracteres")
        .nullable(),
    date: z.string()
})

export type CollateralSellFormValues = z.infer<typeof collateralSellFormSchema>;