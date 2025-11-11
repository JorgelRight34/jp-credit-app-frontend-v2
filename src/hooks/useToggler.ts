import { useState } from "react"

type UseTogglerReturn = [value: boolean, toggle: () => void, setVal: () => void]

export const useToggler = (value: boolean): UseTogglerReturn => {
    const [val, setVal] = useState(value)

    const toggleVal = () => {
        setVal(prev => !prev)
    }

    const close = () => setVal(false)

    return [val, toggleVal, close]
}