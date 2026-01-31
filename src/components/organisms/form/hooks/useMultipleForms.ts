import { useRef } from "react"
import type { FormRef } from "../models/fomRef"

export const useMultipleForms = <
    const TNames extends ReadonlyArray<string>
>(
    names: TNames
) => {
    const formRefs = useRef<Record<TNames[number], FormRef | null>>({} as Record<TNames[number], FormRef>)

    const setFormRef = (name: TNames[number]) => (ref: FormRef) => {
        formRefs.current[name] = ref;
    }

    const handleSubmit = () => {
        for (const name of names) {
            formRefs.current[name as TNames[number]]?.submit()
        }
    }

    return { forms: formRefs.current, setFormRef, handleSubmit }
}