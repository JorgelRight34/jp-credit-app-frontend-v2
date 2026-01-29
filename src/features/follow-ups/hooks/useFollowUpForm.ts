import { followUpsCacheKey, followUpsTag } from "../lib/constants";
import { followUpFormProvider, FollowUpFormValues } from "../lib/form";
import { FollowUp } from "../models/followUp";
import { useMemo } from "react";
import { createFollowUp, editFollowUp } from "../services/followUpClient";
import { toastService } from "@/lib/services";
import { UseEntityFormReturn, UseEntityModuleFormProps } from "@/components";

type UseFollowUpFormProps = UseEntityModuleFormProps<FollowUp, FollowUpFormValues>;

export const useFollowUpForm = ({
  edit,
}: UseFollowUpFormProps): UseEntityFormReturn<FollowUp, FollowUpFormValues> => {
  const defaultVals = useMemo<Partial<FollowUpFormValues>>(
    () => edit ?? {},
    [edit]
  );

  const handleOnSubmit = async (
    data: FollowUpFormValues
  ): Promise<FollowUp> => {
    const response = await createFollowUp(data);

    toastService.success(`Seguimiento creado!`);

    return response;
  };

  const handleOnEdit = async (data: FollowUpFormValues) => {
    const response = await editFollowUp(edit!.id, data)

    toastService.success(`Seguimiento actualizado!`);

    return response;
  }

  return {
    onSubmit: handleOnSubmit,
    onEdit: handleOnEdit,
    config: {
      formProvider: followUpFormProvider,
      resetValues: !!edit,
      defaultValues: defaultVals,
      tagsToInvalidate: [followUpsTag],
      cacheKeysToInvalidate: [followUpsCacheKey]
    },
  };
};

export default useFollowUpForm;
