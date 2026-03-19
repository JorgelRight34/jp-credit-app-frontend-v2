import { useCallback, useState } from "react";
import type { Query } from "../models/query";

type UseSearchContainerReturn<T extends Query> = [T, (q: T) => Promise<T>]

export const useSearchContainer = <T extends Query>(defaultValues: T): UseSearchContainerReturn<T> => {
    const [controlledQuery, setControlledQuery] = useState<T>(defaultValues);

    const handleOnSubmit = useCallback(async (q: T) => {
        setControlledQuery(q)
        return q
    }, [])

    return [controlledQuery, handleOnSubmit]
}