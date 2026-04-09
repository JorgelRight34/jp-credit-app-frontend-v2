import { collateralFormSchema } from "../lib/schemas/collateralFormSchema";
import { createCollateral, updateCollateral } from "../services/collateralClient";
import { collateralsQueryKey } from "../lib/constants";
import type { CollateralFormValues } from "../lib/schemas/collateralFormSchema";
import type { Collateral } from "../models/collateral";
import type { UseDataFormProps } from "@/components";
import { useForm } from "@/components";

export interface UseCollateralFormProps extends UseDataFormProps<Collateral, CollateralFormValues> {
    collateralId?: number;
}

export const useCollateralForm = ({ collateralId, ...config }: UseCollateralFormProps) => {
    return useForm({
        schema: collateralFormSchema,
        onSubmit: createCollateral,
        onEdit: (body) => updateCollateral(collateralId!, body),
        toastMessage: () => "Guardado",
        keysToInvalidate: [[collateralsQueryKey]],
        ...config
    })
}