import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: { staleTime: 120000, gcTime: 12000, retry: false },
    },
});
