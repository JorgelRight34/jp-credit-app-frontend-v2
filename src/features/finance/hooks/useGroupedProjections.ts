import { useData } from "@/hooks/useData";
import { FinanceQuery } from "../models/financeQuery"
import { Projection } from "../models/projection";
import { splitIntoPeriods } from "../lib/utils";
import { useState } from "react";
import { useFinancePeriodNavigator, UseFinancePeriodNavigatorProps } from "./useFinancePeriodNavigator";
import { getProjectionsPerInterval } from "../services/financeService";
import { loansQueryKey } from "@/features/loans";
import { useGroupedFinancialBreakdown } from "./useGroupedFinancialBreakdown";
import { toInputDate } from "@/lib/utils";

interface UseGroupedProjectionsProps extends Partial<UseFinancePeriodNavigatorProps> {
    query: FinanceQuery;
    data?: Array<Projection>
}

export const useGroupedProjections = ({ data: initialData, query, periodsOfMargin = 2 }: UseGroupedProjectionsProps) => {
    const periods = handleSplitIntoPeriods(query)
    const [controlledPeriodsOfMargin, setControlledPeriodsOfMargin] = useState(periodsOfMargin)
    const { period, periodIndex, selectPeriod } = useFinancePeriodNavigator({
        query, periods, periodsOfMargin: controlledPeriodsOfMargin
    });

    const { data } = useData({
        key: [loansQueryKey, "projections", { query }, period],
        loader: () => getProjectionsPerInterval({
            startDate: toInputDate(period!.start!),
            endDate: toInputDate(period!.end!)
        }),
        enabled: !!period?.start || !!period?.end || initialData !== undefined
    })


    const { groups } = useGroupedFinancialBreakdown({
        data: data?.items ?? initialData ?? [],
        timeUnit: query.interval,
    });

    return {
        projections: data,
        periods,
        groups,
        pageSize: periodsOfMargin <= 0 ? 1 : periodsOfMargin,
        period,
        periodIndex,
        onLimitChange: setControlledPeriodsOfMargin,
        onPageChange: (p: number) => selectPeriod(p - 1),
    }
}

const handleSplitIntoPeriods = (query: FinanceQuery) => {
    if (!query.startDate || !query.endDate || !query.interval) return [];

    return splitIntoPeriods(query.startDate, query.endDate, query.interval, query.interval)
}