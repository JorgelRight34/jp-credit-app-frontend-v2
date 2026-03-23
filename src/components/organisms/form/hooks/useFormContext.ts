import { FieldValues } from "react-hook-form"
import { useFormControl, useFormSetValue } from "../providers/form-provider"
import { useMemo } from "react"

export const useFormContext = <T extends FieldValues>() => {
    const control = useFormControl<T>()
    const setValue = useFormSetValue<T>()

    return useMemo(
        () => ({
            control,
            getValues: () => control._formValues as T,
            setValue,
        }),
        [control],
    )
}