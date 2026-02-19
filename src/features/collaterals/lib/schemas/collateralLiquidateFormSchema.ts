import z from "zod";

export const collateralLiquidateFormSchema = z.object({
    description: z.union([z.string().optional(), z.null()])
})

export type CollateralLiquidateFormValues = z.infer<typeof collateralLiquidateFormSchema>;