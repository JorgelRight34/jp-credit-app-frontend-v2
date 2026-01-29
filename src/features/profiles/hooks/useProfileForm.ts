import { useMemo } from "react";
import { profilesQueryKey, profilesTag } from "../lib/constants";
import { createProfile, editProfile } from "../services/profilesClient";
import { toastService } from "@/lib/services";
import { Profile } from "../models/profile";
import { profileFormProvider, ProfileFormValues } from "../lib/profileForm";
import { UseEntityFormReturn, UseEntityModuleFormProps } from "@/components";
import { ProfileRole } from "../models/profileRole";


interface UseProfileFormProps extends UseEntityModuleFormProps<Profile, ProfileFormValues> {
  role?: ProfileRole
}

const useProfileForm = ({
  edit,
  role,
}: UseProfileFormProps): UseEntityFormReturn<Profile, ProfileFormValues> => {
  const defaultValues = useMemo<Partial<ProfileFormValues>>(() => {
    if (edit) {
      return {
        ...edit,
        dni: edit.dni.replace(/-/g, ""),
        dateOfBirth: edit.dateOfBirth.toString(),
      };
    }

    return { nationality: "DO", city: "Santo Domingo" };
  }, [edit]);


  const handleOnSubmit = async (data: ProfileFormValues) => {
    if (!role) throw new Error("Role is required but was not specified.");

    const profile = await createProfile(data);

    toastService.success("Ha sido guardado exitosamente.");

    return profile;
  };

  const handleOnEdit = async (data: ProfileFormValues) => {
    await editProfile(data, edit!.id)
    toastService.success("Ha sido editado exitosamente.");

    return edit!;
  }

  return {
    onSubmit: handleOnSubmit,
    onEdit: handleOnEdit,
    config: {
      formProvider: profileFormProvider,
      resetValues: !edit,
      cacheKeysToInvalidate: [profilesQueryKey],
      tagsToInvalidate: [profilesTag],
      defaultValues
    },
  };
}

export default useProfileForm;
