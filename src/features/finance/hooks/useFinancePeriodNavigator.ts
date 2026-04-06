import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { FinanceQuery } from "../models/financeQuery";
import { Period } from "../models/period";

export interface UseFinancePeriodNavigatorProps {
    periods: Array<Period>;
    periodsOfMargin?: number;
    query: FinanceQuery;
}

type UseFinancePeriodNavigatorReturn = [Period, number, Dispatch<SetStateAction<number>>]

export const useFinancePeriodNavigator = ({ periods, periodsOfMargin = 0 }: UseFinancePeriodNavigatorProps):
    UseFinancePeriodNavigatorReturn => {
    const [periodIndex, setPeriodIndex] = useState(0);

    const period = useMemo<Period>(() => {
        if (periodsOfMargin > 0) {
            const startIndex = Math.max(periodIndex - 1 < 0 ? 0 : periodIndex + periodsOfMargin - 1, 0);
            const endIndex = Math.min(periodIndex + periodsOfMargin, periods.length - 1);

            return {
                start: periodIndex === 0 ? periods[0]?.start : periods[startIndex]?.end,
                end: periods[endIndex]?.end,
            };
        }

        return periods[periodIndex]
    }, [periodsOfMargin, periods, periodIndex])

    return [period, periodIndex, setPeriodIndex]
}