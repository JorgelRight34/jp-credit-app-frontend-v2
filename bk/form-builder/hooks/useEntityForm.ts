"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { FormBuilderRef } from "../models/formBuilder";
import { FieldValues } from "react-hook-form";


export const useEntityForm = <T extends FieldValues = FieldValues>() => {
    const formRef = useRef<FormBuilderRef<T>>(null);
    const [loadForm, setLoadForm] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [reactiveForm, setReactiveForm] = useState<FormBuilderRef<T> | null>();

    const setRef = (instance: FormBuilderRef) => {
        formRef.current = instance as FormBuilderRef<T>;
        if (loadForm == false) {
            setLoadForm(true)
        }
    }

    const handleOnDirtyChange = useCallback((isFormDirty: boolean) => {
        if (isDirty !== isFormDirty) {
            setIsDirty(isFormDirty)
        };
    }, [isDirty])

    useEffect(() => setReactiveForm(formRef.current), [loadForm])

    return {
        form: reactiveForm ?? null,
        isDirty,
        onDirtyChange: handleOnDirtyChange,
        onSubmit: () => formRef.current?.submit,
        reset: () => formRef.current?.reset ?? (() => { }),
        ref: setRef
    }
}