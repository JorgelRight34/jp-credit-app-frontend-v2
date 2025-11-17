import { useMemo } from "react";
import {
  collateralFormProvider,
  CollateralFormValues,
} from "../lib/form";
import { createCollateral, editCollateral } from "../services/collateralsClient";
import { toastService } from "@/services";
import { getPartialDateString } from "@/utils/utils";
import { Collateral } from "../models/collateral";
import { UseEntityFormReturn } from "@/components";
import { collateralsQueryKey, collateralsTag } from "../lib/constants";

interface UseCollateralFormProps {
  edit?: Collateral;
}

const useCollateralForm = ({ edit }: UseCollateralFormProps): UseEntityFormReturn<
  Collateral,
  CollateralFormValues
> => {
  const defaultValues = useMemo(
    () => {
      if (edit) return {
        ...edit,
        photo: undefined,
        location: edit.location || "",
        expirationDate: edit.expirationDate
          ? getPartialDateString(edit.expirationDate)
          : "",
        status: edit.status,
        condition: edit.condition
      }
    },
    [edit]
  );

  const handleOnSubmit = async (data: CollateralFormValues) => {
    const collateral = await createCollateral(data);

    if (collateral) toastService.success("La garantía ha sido guardada exitosamente.");

    return collateral;
  };

  const handleOnEdit = async (data: CollateralFormValues) => {
    const collateral = await editCollateral(edit!.id, data);
    if (collateral) toastService.success("La garantía ha sido guardada exitosamente.");

    return collateral;
  }

  return {
    onSubmit: handleOnSubmit,
    onEdit: handleOnEdit,
    config: {
      formProvider: collateralFormProvider,
      resetValues: edit ? false : true,
      cacheKeysToInvalidate: [collateralsQueryKey],
      tagsToInvalidate: [collateralsTag],
      defaultValues,
    },
  };
};

export default useCollateralForm;
