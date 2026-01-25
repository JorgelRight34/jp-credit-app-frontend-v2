
import { FinanceReport } from "../models/financeReport";
import { FinanceQuery } from "../models/financeQuery";
import { useMemo } from "react";
import { useFinancialReport } from "./useFinancialReport";
import { addDays } from "date-fns";
import { defaultFinanceQuery } from "../lib/constants";
import { TransactionType } from "@/features/transactions";
import { useEntitySection } from "@/components/organisms/entity-section";
import { getDayTimeDifference } from "@/utils";

interface UseFinancesSectionProps {
    type: TransactionType;
}

type UseFinanceSectionReturn = [
    FinanceReport | undefined,
    FinanceReport | undefined,
    { onSubmit: (q: FinanceQuery) => Promise<FinanceQuery>, query: FinanceQuery }
]

export const useFinancesSection = ({ type }: UseFinancesSectionProps): UseFinanceSectionReturn => {
    const [query, setQuery] = useEntitySection<FinanceQuery>(defaultFinanceQuery);

    const handleOnSubmit = async (q: FinanceQuery) => {
        Promise.resolve(setQuery(q))
        return q;
    }

    const timeSpanDays = useMemo(
        () => getDayTimeDifference(query.start, query.end),
        [query]
    );

    const { report } = useFinancialReport({
        ...query,
        type,
    });

    const { report: lastReport } = useFinancialReport({
        ...query,
        start: addDays(query.start, timeSpanDays),
        end: addDays(query.end, timeSpanDays),
        type,
    });

    return [report, lastReport, { onSubmit: handleOnSubmit, query }]
}