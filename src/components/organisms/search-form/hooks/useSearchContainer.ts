import { useState } from "react";
import type { Query } from "../models/query";

type UseSearchContainerReturn<T extends Query> = [T, (q: T) => Promise<T>]

export const useSearchContainer = <T extends Query>(): UseSearchContainerReturn<T> => {
    const [controlledQuery, setControlledQuery] = useState<T>({} as T);

    const handleOnSubmit = async (q: T) => {
        setControlledQuery(q)
        return Promise.resolve(q);
    }

    return [controlledQuery, handleOnSubmit]
}