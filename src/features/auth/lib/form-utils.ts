import { generateUsername } from "./utils";
import type { UseFormSetValue } from "react-hook-form";
import type { UserFormValues } from "./schemas/userFormSchema";

export const updateUsernameOnForm = (
    { lastName, firstName }: UserFormValues,
    setValue: UseFormSetValue<UserFormValues>
) => {
    if (lastName && firstName) {
        setValue("username", generateUsername(firstName, lastName));
    }
};