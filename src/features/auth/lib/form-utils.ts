import { generateUsername } from "./utils";
import type { UserFormValues } from "./schemas/userFormSchema";
import { WatchedValuesChangeHandler } from "@/components";

export const updateUsernameOnForm: WatchedValuesChangeHandler<UserFormValues> = (context) => {
    if (context.formState.isDirty === false) return;

    const { lastName, firstName } = context.getValues();

    if (lastName && firstName) {
        context.setValue("username", generateUsername(firstName.trim(), lastName.trim()));
    }
};