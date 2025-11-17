
import { CacheKey } from "@/models";
import { useQueryClient } from "@tanstack/react-query";


export const useDataClient = () => {
    const queryClient = useQueryClient();

    return {
        get: queryClient.getQueryData,
        set: queryClient.setQueryData,
        invalidate: ({ key }: { key: CacheKey }) => queryClient.invalidateQueries({ queryKey: key }),
    };
};