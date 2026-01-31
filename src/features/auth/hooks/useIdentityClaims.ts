import { useMemo } from "react"
import { getAllPossibleClaims } from "../services/authService";
import { useSuspenseData } from "@/hooks/useData";

export const useIdentityClaims = () => {
    const { data: identityClaims } = useSuspenseData({
        key: ["identity-claims"],
        loader: getAllPossibleClaims
    })

    const claims = useMemo(() => {
        return Object.entries(identityClaims.claims).flatMap(
            ([type, values]) =>
                values.map(({ value, description }) => ({
                    label: `${type} | ${value} | ${description}`,
                    id: value,
                })),
        );
    }, [identityClaims.claims]);


    return { claims }
}