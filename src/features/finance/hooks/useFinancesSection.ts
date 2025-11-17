
import { FinanceReport } from "../models/financeReport";
import { FinanceQuery } from "../models/financeQuery";
import { useMemo } from "react";
import { getDayTimeDifference } from "@/utils/utils";
import { useFinancialReport } from "./useFinancialReport";
import { addDays } from "date-fns";
import { defaultFinanceQuery } from "../lib/constants";
import { TransactionType } from "@/features/transactions";
import { useEntitySection } from "@/components/organisms/entity-section";

interface UseFinancesSectionProps {
    type: TransactionType;
}

type UseFinanceSectionReturn = [
    FinanceReport | undefined,
    FinanceReport | undefined,
    { onSubmit: (q: FinanceQuery) => Promise<FinanceQuery>, defaultValues: FinanceQuery, query: FinanceQuery }
]

export const useFinancesSection = ({ type }: UseFinancesSectionProps): UseFinanceSectionReturn => {
    const [query, setQuery, defaultValues] = useEntitySection<
        FinanceReport,
        FinanceQuery
    >(defaultFinanceQuery);

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

    return [report, lastReport, { onSubmit: handleOnSubmit, defaultValues, query }]
}