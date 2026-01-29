import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export const useIsLoading = () => {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();

    return { isFetching: isFetching > 0, isMutating: isMutating > 0 };
}