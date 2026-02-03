import { useState } from "react";
import type { Query } from "../models/query";

type UseSearchContainerReturn<T extends Query> = [T, (q: T) => Promise<T>]

export const useSearchContainer = <T extends Query>(initialValues: T): UseSearchContainerReturn<T> => {
    const [controlledQuery, setControlledQuery] = useState<T>(initialValues);

    const handleOnSubmit = async (q: T) => {
        setControlledQuery(q)
        return Promise.resolve(q);
    }

    return [controlledQuery, handleOnSubmit]
}