
import { User } from "../models/user";
import { UseEntityFormReturn } from "../../../components/EntityForm/models/useEntityFormReturn";
import { userFormProvider, UserFormValues } from "../lib/form";
import { toastService } from "@/services";
import { UseEntityModuleFormProps } from "@/components/EntityForm/models/UseEntityModuleFormProps";
import { createUser, editUser } from "../services/userService";
import { usersQueryKey } from "../lib/constants";
import { useMemo } from "react";

export type UseUserFormProps = UseEntityModuleFormProps<User, UserFormValues>;

const useUserForm = ({
  edit,
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
  }

  return {
    onSubmit: handleOnSubmit,
    onEdit: handleOnEdit,
    config: {
      formProvider: userFormProvider,
      resetValues: !edit,
      cacheKeysToInvalidate: [usersQueryKey],
      defaultValues
    },
  };
};

export default useUserForm;
