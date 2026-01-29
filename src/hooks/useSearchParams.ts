import { useRouterState } from "@tanstack/react-router";

export const useSearchParams = () => {
    const search = useRouterState({
        select: (state) => state.location.search,
    });

    return new URLSearchParams(search);
};
