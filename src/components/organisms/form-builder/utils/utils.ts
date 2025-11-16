import { FormProvider } from "../models/formProvider";
import { FieldValues } from "react-hook-form";

export const getDefaultValues = <T extends FieldValues,>(fields: FormProvider<T>["fields"]) => {
    const defaults: Partial<Record<keyof T, null>> = {};

    for (let i = 0; i < fields.length; i++) {
        const name = fields[i].name as keyof T;
        defaults[name] = null;
    }

    return defaults;
}