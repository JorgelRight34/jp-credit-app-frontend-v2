import { useData } from "@/hooks/useData";
import { FinanceQuery } from "../models/financeQuery"
import { Projection } from "../models/projection";
import { splitIntoPeriods } from "../lib/utils";
import { useFinancePeriodNavigator, UseFinancePeriodNavigatorProps } from "./useFinancePeriodNavigator";
import { getProjectionsPerInterval } from "../services/financeService";
import { useGroupedFinancialBreakdown } from "./useGroupedFinancialBreakdown";
import { toInputDate } from "@/lib/utils";
import { projectionsQueryKey, projectionsSummaryQueryKey } from "../lib/query-keys";

interface UseGroupedProjectionsProps extends Partial<UseFinancePeriodNavigatorProps> {
    query: FinanceQuery;
    data?: Array<Projection>
}

export const useGroupedProjections = ({ data: initialData, query }: UseGroupedProjectionsProps) => {
    const periods = handleSplitIntoPeriods(query)
    const { period, periodIndex, selectPeriod } = useFinancePeriodNavigator({ query, periods });
    const { data } = useData({
        key: [projectionsQueryKey, projectionsSummaryQueryKey, { query }, period],
        loader: () => getProjectionsPerInterval({
            startDate: toInputDate(period!.start!),
            endDate: toInputDate(period!.end!),
        }),
        enabled: !!period?.start || !!period?.end || initialData !== undefined
    })

    const [groups, groupMap] = useGroupedFinancialBreakdown({
        data: data?.items ?? initialData ?? [],
        timeUnit: query.interval,
    });

    return {
        projections: data,
        periods,
        groups,
        groupMap,
        period,
        periodIndex,
        onPageChange: (p: number) => selectPeriod(p - 1),
    }
}

const handleSplitIntoPeriods = (query: FinanceQuery) => {
    if (!query.startDate || !query.endDate || !query.interval) return [];

    return splitIntoPeriods(query.startDate, query.endDate, query.interval, query.interval)
}