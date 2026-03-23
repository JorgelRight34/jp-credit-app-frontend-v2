import { useMemo, useState } from "react";
import { FinanceQuery } from "../models/financeQuery";
import { Period } from "../models/period";

export interface UseFinancePeriodNavigatorProps {
    periods: Array<Period>;
    periodsOfMargin?: number;
    query: FinanceQuery;
}


export const useFinancePeriodNavigator = ({ periods, periodsOfMargin = 0 }: UseFinancePeriodNavigatorProps) => {
    const [periodIndex, setPeriodIndex] = useState(0);

    const period = useMemo<Period>(() => {
        if (periodsOfMargin > 0) {
            return {
                start: periods[periodIndex]?.start,
                end: periods[Math.min(periodIndex + periodsOfMargin, periods.length - 1)]?.end
            }
        }

        return periods[periodIndex]
    }, [periodsOfMargin, periods, periodIndex])

    return { period, periodIndex, selectPeriod: setPeriodIndex }
}