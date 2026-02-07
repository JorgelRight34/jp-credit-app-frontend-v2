import { collateralFormSchema } from "../lib/schemas/collateralFormSchema";
import { createCollateral, updateCollateral } from "../services/collateralClient";
import { collateralsQueryKey } from "../lib/constants";
import type { CollateralFormValues } from "../lib/schemas/collateralFormSchema";
import type { Collateral } from "../models/collateral";
import type { UseDataFormProps } from "@/components";
import { useForm } from "@/components";

export interface UseCollateralFormProps extends UseDataFormProps<Collateral, CollateralFormValues> {
    collateral?: Collateral
}

export const useCollateralForm = ({ collateral, initialValues, ...config }: UseCollateralFormProps) => {
    return useForm({
        schema: collateralFormSchema,
        defaultValues: collateral ? {
            title: collateral.title,
            description: collateral.description,
            value: collateral.value,
            condition: collateral.condition,
            status: collateral.status,
            type: collateral.type,
            location: collateral.location,
            expirationDate: collateral.expirationDate,
            ownerId: collateral.ownerId,
        } : {
            title: "",
            description: "",
            value: 0,
            condition: "",
            status: "",
            type: "",
            location: "",
            expirationDate: "",
            ownerId: 0,
            ...initialValues
        },
        onSubmit: createCollateral,
        onEdit: (body) => updateCollateral(collateral!.id, body),
        shouldEdit: !!collateral,
        keysToInvalidate: [[collateralsQueryKey]],
        ...config
    })
}