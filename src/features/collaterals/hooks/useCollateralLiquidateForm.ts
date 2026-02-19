import { UseDataFormProps, useForm } from "@/components";
import { collateralLiquidateFormSchema, CollateralLiquidateFormValues } from "../lib/schemas/collateralLiquidateFormSchema";
import { liquidateCollateral } from "../services/collateralClient";
import { collateralsQueryKey } from "../lib/constants";
import { loansQueryKey } from "@/features/loans/lib/constants";

interface UseCollateralLiquidateFormProps extends UseDataFormProps<null, CollateralLiquidateFormValues> {
    collateralId: number;
}

export const useCollateralLiquidateForm = ({ collateralId, ...props }: UseCollateralLiquidateFormProps) => {
    return useForm({
        schema: collateralLiquidateFormSchema,
        defaultValues: { description: '' },
        onSubmit: async (data) => liquidateCollateral(collateralId, data),
        keysToInvalidate: [[collateralsQueryKey], [loansQueryKey]],
        ...props
    })
}