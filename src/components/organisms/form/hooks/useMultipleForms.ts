import { useRef, useState } from "react"
import type { FieldValues } from "react-hook-form";
import type { RefCallback } from "react";
import type { FormRef } from "../models/fomRef"

export const useMultipleForms = <
    const TNames extends ReadonlyArray<string>
>(
    names: TNames
) => {
    const [isDirty, setIsDirty] = useState(false)
    const formRefs = useRef<Record<TNames[number], FormRef | null>>({} as Record<TNames[number], FormRef>)

    const setFormRef = <T extends FieldValues>(name: TNames[number]): RefCallback<FormRef<T>> => (ref) => {
        formRefs.current[name] = ref as FormRef<FieldValues>;
    }

    const handleSubmit = () => {
        for (const name of names) {
            const form = formRefs.current[name as TNames[number]];
            if (form?.isDirty()) {
                form.submit()
            }
        }
    }

    return { forms: formRefs.current, setFormRef, handleSubmit, isDirty, onDirtyChange: setIsDirty }
}