import { UseDataFormProps, useForm } from "@/components";
import { collateralLiquidateFormSchema, CollateralLiquidateFormValues } from "../lib/schemas/collateralLiquidateFormSchema";
import { liquidateCollateral } from "../services/collateralClient";
import { collateralsQueryKey } from "../lib/constants";
import { loansQueryKey } from "@/features/loans";
import { CollateralLiquidationResult } from "../models/collateralLiquidationResult";
import { transactionsQueryKey } from "@/features/transactions";

interface UseCollateralLiquidateFormProps extends UseDataFormProps<CollateralLiquidationResult, CollateralLiquidateFormValues> {
    collateralId: number;
}

export const useCollateralLiquidateForm = ({ collateralId, ...props }: UseCollateralLiquidateFormProps) => {
    return useForm({
        schema: collateralLiquidateFormSchema,
        defaultValues: { description: '' },
        onSubmit: (data) => liquidateCollateral(collateralId, data),
        keysToInvalidate: [[collateralsQueryKey], [loansQueryKey], [transactionsQueryKey]],
        ...props
    })
}