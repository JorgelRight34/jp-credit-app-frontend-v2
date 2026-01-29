import { useCallback, useMemo, useState } from "react";
import { FinanceQuery } from "../models/financeQuery";
import { Period } from "../models/period";

export interface UseFinancePeriodNavigatorProps {
    periods: Period[];
    periodsOfMargin?: number;
    query: FinanceQuery;
}

type PeriodsNav = {
    period: Period | { start: Period['start'] | undefined; end: Period['end'] | undefined } | undefined;
    nextPeriod: Period | undefined;
    prevPeriod: Period | undefined;
}

export const useFinancePeriodNavigator = ({ periods, periodsOfMargin = 0 }: UseFinancePeriodNavigatorProps) => {
    const [periodIndex, setPeriodIndex] = useState(0);

    const { period, nextPeriod, prevPeriod } = useMemo<PeriodsNav>(() => {
        if (periodsOfMargin > 0) {
            return {
                period: {
                    start: periods[periodIndex]?.start,
                    end: periods[Math.min(periodIndex + periodsOfMargin, periods.length - 1)]?.end
                },
                nextPeriod: periods[periodIndex + periodsOfMargin + 1],
                prevPeriod: periods[periodIndex - 1]
            }
        }

        return {
            period: periods[periodIndex],
            nextPeriod: periods[periodIndex + 1],
            prevPeriod: periods[periodIndex - 1]
        }
    }, [periodsOfMargin, periods, periodIndex])

    const selectPeriod = useCallback((period: number) => {
        setPeriodIndex(prev => {
            if (period > periods.length - 1) return prev;
            return period
        })
    }, [periods.length]);

    return { period, prevPeriod, nextPeriod, periodIndex, selectPeriod }
}