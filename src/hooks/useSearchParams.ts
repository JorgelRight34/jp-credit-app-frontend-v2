import { useMemo } from "react";
import { useLocation } from "react-router"

export const useQueryParams = () => {
    const { search } = useLocation();

    return useMemo(() => {
        const params = new URLSearchParams(search);
        return Object.fromEntries(params);
    }, [search])
}