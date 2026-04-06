import { useData } from "@/hooks/useData";
import { FinanceQuery } from "../models/financeQuery"
import { Projection } from "../models/projection";
import { splitIntoPeriods } from "../lib/utils";
import { UseFinancePeriodNavigatorProps } from "./useFinancePeriodNavigator";
import { getProjectionsPerInterval } from "../services/financeService";
import { useGroupedFinancialBreakdown } from "./useGroupedFinancialBreakdown";
import { toInputDate } from "@/lib/utils";
import { projectionsQueryKey, projectionsSummaryQueryKey } from "../lib/query-keys";
import { usePageSize } from "@/components";
import { groupedProjectionsPageSizeIdentifier } from "../lib/constants";
import { useMemo, useState } from "react";

interface UseGroupedProjectionsProps extends Partial<UseFinancePeriodNavigatorProps> {
    query: FinanceQuery;
    data?: Array<Projection>
}

export const useGroupedProjections = ({ query }: UseGroupedProjectionsProps) => {
    const [numberOfPeriods, setNumberOfPeriods] = usePageSize(groupedProjectionsPageSizeIdentifier, 1)
    const periods = useMemo(() => handleSplitIntoPeriods(query, numberOfPeriods), [query, numberOfPeriods])
    const [periodIndex, setPeriodIndex] = useState(0);
    const period = useMemo(() => periods[periodIndex], [periods, periodIndex]);
    const { data } = useData({
        key: [projectionsQueryKey, projectionsSummaryQueryKey, { query }, period],
        loader: () => getProjectionsPerInterval({
            startDate: toInputDate(period!.start),
            endDate: toInputDate(period!.end),
        }),
        enabled: !!period
    })

    const [groups, groupMap] = useGroupedFinancialBreakdown({
        data: data?.items,
        timeUnit: query.interval,
    });

    return {
        projections: data,
        periods,
        groups,
        groupMap,
        period,
        pageSize: numberOfPeriods,
        onLimitChange: setNumberOfPeriods,
        onPageChange: (p: number) => setPeriodIndex(p - 1),
    }
}

const handleSplitIntoPeriods = (query: FinanceQuery, periodsofMargin: number) => {
    if (!query.startDate || !query.endDate || !query.interval) return [];

    return splitIntoPeriods(query.startDate, query.endDate, query.interval, periodsofMargin)
}