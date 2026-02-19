import { UseDataFormProps, useForm } from "@/components";
import { collateralSellFormSchema, CollateralSellFormValues } from "../lib/schemas/collateralSellFormSchema";
import { Transaction } from "@/features/transactions";
import { Collateral } from "../models/collateral";
import { sellCollateral } from "../services/collateralClient";
import { collateralsQueryKey } from "../lib/constants";

interface UseCollateralSellFormProps extends UseDataFormProps<Transaction, CollateralSellFormValues> {
    collateral: Collateral
}

export const useCollateralSellForm = ({ collateral, initialValues, ...config }: UseCollateralSellFormProps) => {
    return useForm({
        schema: collateralSellFormSchema,
        defaultValues: { value: collateral.value, description: null, date: '' },
        toastMessage: () => `La garantia No. ${collateral.id} ha sido vendida!`,
        onSubmit: (body) => sellCollateral(collateral.id, body),
        keysToInvalidate: [[collateralsQueryKey]],
        ...config
    })
}