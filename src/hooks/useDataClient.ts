
import { useQueryClient } from "@tanstack/react-query";
import type { CacheKey } from "@/models";


export const useDataClient = () => {
    const queryClient = useQueryClient();

    return {
        get: queryClient.getQueryData,
        set: queryClient.setQueryData,
        invalidate: ({ key }: { key: CacheKey }) => queryClient.invalidateQueries({ queryKey: key }),
        ensure: ({ key, getData }: { key: CacheKey, getData: () => Promise<unknown> }) =>
            queryClient.ensureQueryData({ queryKey: key, queryFn: getData })
    };
};