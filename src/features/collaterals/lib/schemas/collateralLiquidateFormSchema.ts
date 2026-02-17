import z from "zod";

export const collateralLiquidateFormSchema = z.object({
    description: z.string().optional()
})

export type CollateralLiquidateFormValues = z.infer<typeof collateralLiquidateFormSchema>;