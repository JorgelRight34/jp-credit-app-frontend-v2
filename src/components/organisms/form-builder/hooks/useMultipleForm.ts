"use client"

import { useState, useCallback } from "react";
import { FormBuilderRef } from "../models/formBuilder";

type UseMultipleFormProps<T extends string> = readonly T[];

export const useMultipleForm = <T extends string = string>(
    keys: UseMultipleFormProps<T>
) => {
    const [forms, setForms] = useState<Record<T, FormBuilderRef | null>>(
        Object.fromEntries(keys.map((key) => [key, null])) as Record<
            T,
            FormBuilderRef | null
        >
    );

    const [isDirty, setIsDirty] = useState(false);

    const setFormRef = useCallback(
        (key: T) => (ref: FormBuilderRef | null, replace: boolean = false) => {
            setForms((prev) => {
                if (replace === false && prev[key]) return prev;
                return { ...prev, [key]: ref };
            });
        },
        []
    );

    const getFormValues = useCallback(
        () => Object.values(forms) as (FormBuilderRef | null)[],
        [forms]
    );

    const reset = useCallback(() => {
        for (const form of getFormValues()) form?.reset();
    }, [getFormValues]);

    const updateIsDirty = useCallback(() => {
        setIsDirty(getFormValues().some((form) => form?.isDirty));
    }, [getFormValues]);

    const submitAllForms = useCallback(async () => {
        await Promise.all(getFormValues().map((form) => form?.submit?.()));
    }, [getFormValues]);

    return {
        forms,
        isDirty,
        setFormRef,
        reset,
        onDirtyChange: updateIsDirty,
        submitAllForms,
    };
};
