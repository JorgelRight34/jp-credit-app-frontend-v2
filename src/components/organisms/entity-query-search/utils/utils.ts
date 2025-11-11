import { FormField } from "@/components/EntityForm";
import { QuerySearchInput } from "@/models"
import { Query } from "@/models/query";

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
        valuesToWatch,
    }: {
        attributes?: Partial<Record<keyof T, Partial<FormField<T>>>>;
        defaultValues?: Partial<T>;
        valuesToWatch?: React.RefObject<(keyof T)[]>;
    }
) {
    const result: QuerySearchInput<T>[] = [];

    for (const field of fields) {
        const { searchOnChange, id, name, hideWhenDefault, ...rest } = field;

        if (searchOnChange && valuesToWatch?.current) {
            valuesToWatch.current.push(name as keyof T);
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

    return result;
}
