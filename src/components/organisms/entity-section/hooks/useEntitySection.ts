import { Query } from "@/models/query";
import { useEffect, useMemo, useState } from "react";
import { getUrlParams } from "@/utils/utils";
import { BaseEntitySectionProps } from "../components/EntitySection";
import { useRouter } from "next/router";
import { usePathname } from "@/hooks/usePathname";

type UseEntitySectionProps<TEntity, TQuery extends Query> = Pick<BaseEntitySectionProps<TEntity, TQuery>, "onQueryChange"> & TQuery & {
    navigate?: boolean;
};

type UseEntitySectionReturns<TQuery> = [TQuery, ((q: TQuery) => Promise<TQuery>), TQuery]

export const useEntitySection = <TEntity, TQuery extends Query>(
    { onQueryChange, navigate, ...query }: UseEntitySectionProps<TEntity, TQuery>):
    UseEntitySectionReturns<TQuery> => {
    const [controlledQuery, setControlledQuery] = useState<TQuery>((query ?? {}) as TQuery);
    const router = useRouter();
    const pathname = usePathname();

    const defaultQuery = useMemo(() => ({
        ...query as TQuery,
        ...Object.fromEntries((new URLSearchParams(window.location.search)).entries())
    }
    ), [query])

    const handleChange = (q: TQuery) => {
        setControlledQuery(q);
        if (navigate) {
            router.replace(pathname + "?" + getUrlParams(q));
        }
        return Promise.resolve(q);
    };

    useEffect(() => {
        onQueryChange?.(controlledQuery)
    }, [controlledQuery, onQueryChange])

    return [controlledQuery, handleChange, defaultQuery]
}
