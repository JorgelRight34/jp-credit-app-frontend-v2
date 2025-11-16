"use client"

import { useMemo } from "react";
import { FieldValues, Path, useForm, useWatch } from "react-hook-form"
import { FormBuilderRef } from "../models/formBuilder";

export interface UseFormSubscribeProps<T extends FieldValues> {
    form: FormBuilderRef<T> | null;
    subscribedNames?: (keyof T)[];
}

export const useFormSubscribe = <T extends FieldValues>(
    { form, subscribedNames = [] }: UseFormSubscribeProps<T>
) => {
    const dummyForm = useForm<T>();

    const values = useWatch({
        control: form?.control ?? dummyForm.control,
        name: subscribedNames as Path<T>[],
    })

    const valuesMap = useMemo<Partial<T>>(() => {
        const map: Partial<T> = {} as Partial<T>;
        for (let i = 0; i < values.length; i++) {
            map[subscribedNames[i]] = values[i];
        }
        return map
    }, [subscribedNames, values])

    return valuesMap;
}