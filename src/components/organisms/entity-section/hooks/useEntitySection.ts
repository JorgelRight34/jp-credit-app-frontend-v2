import { Query } from "@/models/query";
import { useState } from "react";
import { getUrlParams } from "@/utils/utils";
import { useRouter } from "next/router";
import { usePathname } from "@/hooks/usePathname";

type UseEntitySectionProps<TQuery extends Query> = TQuery & {
    navigate?: boolean;
};

type UseEntitySectionReturns<TQuery> = [TQuery, ((q: TQuery) => Promise<TQuery>), TQuery]

export const useEntitySection = <TQuery extends Query>(
    { navigate, ...defaultQuery }: UseEntitySectionProps<TQuery>):
    UseEntitySectionReturns<TQuery> => {
    const [controlledQuery, setControlledQuery] = useState<TQuery>((defaultQuery ?? {}) as TQuery);
    const router = useRouter();
    const pathname = usePathname();

    const handleOnSubmit = (q: TQuery) => {
        setControlledQuery(q);

        if (navigate) {
            router.replace(pathname + "?" + getUrlParams(q));
        }

        return Promise.resolve(q);
    };

    return [controlledQuery, handleOnSubmit, defaultQuery as TQuery]
}
