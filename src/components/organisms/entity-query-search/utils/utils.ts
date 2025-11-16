
import { Query } from "@/models/query";
import { QuerySearchInput } from "../models/querySearchInput";
import { FormField } from "../../form-builder/models/formField";

export const shouldShowField = <T extends Query>(
    field: QuerySearchInput<T>,
    defaultQuery?: Partial<T>
): boolean => {
    if (!field.name) {
        return false;
    }

    if (field.hideWhenDefault === false) {
        return true;
    }

    return !defaultQuery?.[field.name as keyof Partial<T>];
};


export function sanitizeFields<T extends Query>(
    fields: QuerySearchInput<T>[],
    {
        attributes,
        defaultValues,
    }: {
        attributes?: Partial<Record<keyof T, Partial<FormField<T>>>>;
        defaultValues?: Partial<T>
    }
) {
    const result: QuerySearchInput<T>[] = [];
    const valuesToWatch: (keyof T)[] = [];

    for (const field of fields) {
        const { searchOnChange, id, name, hideWhenDefault, ...rest } = field;

        if (searchOnChange && valuesToWatch) {
            valuesToWatch.push(name as keyof T);
        }

        const base: QuerySearchInput<T> = {
            id: id ?? name,
            name,
            ...rest,
            ...(attributes?.[name as keyof T] ?? {}),
        };

        if (!hideWhenDefault || shouldShowField(base, defaultValues)) {
            result.push(base);
        }
    }

    return { fields: result, valuesToWatch };
}
