import { useData } from "@/hooks/useData";
import { CacheKey } from "@/models"

interface UseEntitySearchInputProps<T> {
    onSearch: (defaultValue: number) => Promise<T>
    cacheKey: CacheKey;
    defaultValue?: number | unknown;
}

export const useEntitySearchInput = <T,>({ cacheKey, onSearch, defaultValue }: UseEntitySearchInputProps<T>) => {
    const { data, isLoading, isError } = useData({
        key: cacheKey,
        getData: () => onSearch(defaultValue as number),
        enabled: !!defaultValue
    })

    return { entity: data, isLoading, isError }
}