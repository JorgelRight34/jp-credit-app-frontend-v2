import { profileFormSchema } from "../lib/schemas/profileFormSchema"
import { createProfile, updateProfile } from "../services/profileClient";
import { profilesQueryKey } from "../lib/constants";
import type { UseDataFormProps, UseFormBuilderReturn } from "@/components";
import type { ProfileFormValues } from "../lib/schemas/profileFormSchema";
import type { Profile } from "../models/profile"
import { useForm } from "@/components"

interface UseProfileFormProps extends UseDataFormProps<Profile, ProfileFormValues> {
    profile?: Profile
}

export const useProfileForm = ({ profile, initialValues, ...config }: UseProfileFormProps):
    UseFormBuilderReturn<ProfileFormValues> => {
    return useForm({
        schema: profileFormSchema,
        defaultValues: profile ? {
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            gender: profile.gender,
            dateOfBirth: profile.dateOfBirth,
            maritalStatus: profile.maritalStatus,
            dni: profile.dni.replace('-', '').replace("-", ""),  // REMOVE THIS WHEN API SEEDS AGAIN WITH RIGHT FORMAT
            address: profile.address,
            landline: profile.landline,
            officePhone: profile.officePhone,
            phoneNumber: profile.phoneNumber,
            ...initialValues,
        } : {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            dateOfBirth: null,
            maritalStatus: "",
            dni: "",
            address: "",
            landline: "",
            officePhone: "",
            phoneNumber: "",
            ...initialValues,
        },
        onSubmit: createProfile,
        onEdit: (body) => updateProfile(profile!.id, body),
        keysToInvalidate: [[profilesQueryKey]],
        shouldEdit: !!profile,
        ...config
    })
}