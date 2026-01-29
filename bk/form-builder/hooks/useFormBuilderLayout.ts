import { useCallback, useMemo } from "react";
import { FormField } from "../models/formField";
import { FormGrid } from "../models/formGrid";
import { FormLayout } from "../models/formLayout";
import { FieldValues } from "react-hook-form";

interface UseFormBuilderLayoutProps<TData extends FieldValues> {
    fields: FormField<TData>[];
    grid?: FormGrid;
    layout?: FormLayout<TData>
}

export const useFormBuilderLayout = <TData extends FieldValues>(
    { fields, grid = { rows: fields.length, columns: 1 }, layout }: UseFormBuilderLayoutProps<TData>
) => {
    const computedLayout = useMemo<FormLayout<TData>>(() => {
        if (layout) return layout;

        return Array.from({ length: grid.rows }, (_, i) =>
            Array.from({ length: grid.columns }, (_, j) => fields[i * grid.columns + j]?.name ?? null)
        ) as FormLayout<TData>;
    }, [layout, fields, grid.rows, grid.columns]);

    const fieldsMap = useMemo(() => {
        const map = new Map<keyof TData, FormField<TData>>();
        for (let i = 0; i < fields.length; i++) {
            const item = fields[i];
            map.set(item.name as keyof TData, item);
        }
        return map;
    }, [fields]);

    const get = useCallback(
        (name: keyof TData | null | string) => {
            if (name == null) return;

            const field = fieldsMap.get(name as keyof TData)
            if (!field) throw Error(`${name?.toString()} is not a valid name.`)

            return field
        },
        [fieldsMap]
    );

    return useMemo(() => ({ fieldsMap: { fields, get }, layout: computedLayout }), [computedLayout, fields, get])
}
