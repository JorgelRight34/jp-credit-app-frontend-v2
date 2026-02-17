import { UseDataFormProps, useForm } from "@/components";
import { collateralLiquidateFormSchema, CollateralLiquidateFormValues } from "../lib/schemas/collateralLiquidateFormSchema";
import { liquidateCollateral } from "../services/collateralClient";

interface UseCollateralLiquidateFormProps extends UseDataFormProps<null, CollateralLiquidateFormValues> {
    collateralId: number;
}

export const useCollateralLiquidateForm = ({ collateralId, ...props }: UseCollateralLiquidateFormProps) => {
    return useForm({
        schema: collateralLiquidateFormSchema,
        defaultValues: { description: '' },
        onSubmit: async (data) => {
            await liquidateCollateral(collateralId, data)
            return null;
        },
        ...props
    })
}