import { useEffect, useState } from "react"
import { Control, FieldValues, useFormState } from "react-hook-form"

export const useHasFormEverBeenDirty = (control: Control<FieldValues>) => {
    const { isDirty } = useFormState({ control })
    const [hasEverBeenDirty, setHasEverBeenDirty] = useState(false)

    useEffect(() => {
        if (isDirty) setHasEverBeenDirty(true)
    }, [isDirty])

    return hasEverBeenDirty
}