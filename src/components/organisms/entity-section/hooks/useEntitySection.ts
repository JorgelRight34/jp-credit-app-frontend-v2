import { Query } from "@/models/query";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "../../../hooks/useRouter";
import { getUrlParams } from "@/utils/utils";
import { BaseEntitySectionProps } from "@/components/EntitySection/components/EntitySection";

type UseEntitySectionProps<TEntity, TQuery extends Query> = Pick<BaseEntitySectionProps<TEntity, TQuery>, "onQueryChange"> & TQuery & {
    navigate?: boolean;
};

type UseEntitySectionReturns<TQuery> = [TQuery, ((q: TQuery) => Promise<TQuery>), TQuery]

export const useEntitySection = <TEntity, TQuery extends Query>(
    { onQueryChange, navigate, ...query }: UseEntitySectionProps<TEntity, TQuery>):
    UseEntitySectionReturns<TQuery> => {
    const router = useRouter();
    const [controlledQuery, setControlledQuery] = useState<TQuery>((query ?? {}) as TQuery);

    const defaultQuery = useMemo(() => {
        return {
            ...query as TQuery,
            ...Object.fromEntries((new URLSearchParams(window.location.search)).entries())
        }
    }, [query])

    const handleChange = (q: TQuery) => {
        setControlledQuery(q);
        if (navigate) {
            router.history.pushState({}, "", router.location.pathname + "?" + getUrlParams(q));
        }
        return Promise.resolve(q);
    };

    useEffect(() => {
        onQueryChange?.(controlledQuery)
    }, [controlledQuery, onQueryChange])

    return [controlledQuery, handleChange, defaultQuery]
}
