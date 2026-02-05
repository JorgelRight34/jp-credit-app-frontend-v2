import { profileFormSchema } from "../lib/schemas/profileFormSchema"
import { createProfile, updateProfile } from "../services/profileClient";
import type { UseDataFormProps, UseFormBuilderReturn } from "@/components";
import type { ProfileFormValues } from "../lib/schemas/profileFormSchema";
import type { Profile } from "../models/profile"
import { useForm } from "@/components"

export const useProfileForm = ({ initialValues, ...config }: UseDataFormProps<Profile, ProfileFormValues>):
    UseFormBuilderReturn<ProfileFormValues> => {
    return useForm({
        schema: profileFormSchema,
        defaultValues: {
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
            profession: "",
            nationality: "",
            city: "",
            ...initialValues,
        },
        onSubmit: createProfile,
        onEdit: updateProfile,
        ...config
    })
}