/*
import { userFormProvider, UserFormValues } from "../lib/form";
import { toastService } from "@/lib/services";
import { createUser, editUser } from "../services/userClient";
import { usersQueryKey, usersTag } from "../lib/constants";
import { useMemo } from "react";
import { UseEntityFormReturn, UseEntityModuleFormProps } from "@/components";
import { User } from "../models/user";

export type UseUserFormProps = UseEntityModuleFormProps<User, UserFormValues>;

export const useUserForm = ({
  edit
}: UseUserFormProps): UseEntityFormReturn<User, UserFormValues> => {
  const defaultValues = useMemo(() => ({ ...edit }), [edit])

  const handleOnSubmit = async (data: UserFormValues) => {
    const profile = await createUser(data);

    toastService.success("Ha sido registrado exitosamente.");

    return profile;
  };

  const handleOnEdit = async (data: UserFormValues) => {
    await editUser(data, edit!.id)
    toastService.success("Ha sido editado exitosamente.");

    return data;
  }

  return {
    onSubmit: handleOnSubmit,
    onEdit: handleOnEdit,
    config: {
      formProvider: userFormProvider,
      resetValues: !edit,
      cacheKeysToInvalidate: [usersQueryKey],
      tagsToInvalidate: edit ? [[usersTag, edit?.id.toString()]] : [],
      defaultValues
    },
  };
};

*/
export const Default = () => {
  return {}
}

export default Default