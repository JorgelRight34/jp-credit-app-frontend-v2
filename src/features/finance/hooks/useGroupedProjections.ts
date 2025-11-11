import useEntityDatatable from "@/components/DataTable/hooks/useEntityDatatable";
import { useGroupedFinancialBreakdown } from "./useGroupedFinancialBreakdown";
import { projectionsCacheKey } from "../lib/constants";
import { getProjections } from "../services/financeClient";
import { FinanceQuery } from "../models/financeQuery";
import { useFinancePeriodNavigator, UseFinancePeriodNavigatorProps } from "./useFinancePeriodNavigator";
import { useFinancePeriods } from "./useFinancePeriods";
import { useState } from "react";
import { Projection } from "../models/projection";

interface UseGroupedProjectionsProps extends Partial<UseFinancePeriodNavigatorProps> {
    query: FinanceQuery;
    data?: Projection[]
}

export const useGroupedProjections = ({ query, data: initialData, periodsOfMargin = 2 }: UseGroupedProjectionsProps) => {
    const { periods } = useFinancePeriods({ query })
    const [controlledPeriodsOfMargin, setControlledPeriodsOfMargin] = useState(periodsOfMargin)
    const { period, periodIndex, selectPeriod } = useFinancePeriodNavigator({
        query, periods, periodsOfMargin: controlledPeriodsOfMargin
    });

    const { data, limit } = useEntityDatatable({
        cacheKey: [...projectionsCacheKey, "projections"],
        loader: getProjections,
        query: period as FinanceQuery,
        enabled: !!period?.start || !!period?.end || initialData !== undefined
    });

    const { groups } = useGroupedFinancialBreakdown({
        data: data?.items ?? initialData ?? [],
        timeUnit: query.timeUnit,
    });

    return {
        projections: data,
        periods,
        groups,
        pageSize: periodsOfMargin <= 0 ? 1 : periodsOfMargin,
        limit,
        period,
        periodIndex,
        onLimitChange: setControlledPeriodsOfMargin,
        fetchPage: (p: number) => selectPeriod(p - 1),
    }
}