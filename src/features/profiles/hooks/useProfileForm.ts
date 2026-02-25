import { profileFormSchema } from "../lib/schemas/profileFormSchema"
import { createProfile, updateProfile } from "../services/profileClient";
import { profilesQueryKey } from "../lib/constants";
import type { UseDataFormProps, UseFormBuilderReturn } from "@/components";
import type { ProfileFormValues } from "../lib/schemas/profileFormSchema";
import type { Profile } from "../models/profile"
import { useForm } from "@/components"

interface UseProfileFormProps extends UseDataFormProps<Profile, ProfileFormValues> {
    profileId?: number;
}

export const useProfileForm = ({ profileId, initialValues, ...config }: UseProfileFormProps):
    UseFormBuilderReturn<ProfileFormValues> => {
    return useForm({
        schema: profileFormSchema,
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            dateOfBirth: "",
            maritalStatus: "",
            dni: "",
            address: "",
            landline: "",
            officePhone: "",
            phoneNumber: "",
        },
        onSubmit: createProfile,
        onEdit: (body) => updateProfile(profileId!, body),
        keysToInvalidate: [[profilesQueryKey]],
        ...config
    })
}