import { TimeUnit } from "@/models"
import { useMemo } from "react";

interface UseGroupedFinancialBreakdownProps<T extends { date: Date | string }> {
    timeUnit?: TimeUnit;
    data?: T[];
};

export const useGroupedFinancialBreakdown = <T extends { date: Date | string }>(
    { data, timeUnit }: UseGroupedFinancialBreakdownProps<T>) => {

    const groupsMap = useMemo<Record<string, T[]>>(() => {
        if (!data) return {};

        return data.reduce<Record<string, T[]>>((acc, curr) => {
            const currDate = new Date(curr.date);
            let key: string;

            switch (timeUnit) {
                case TimeUnit.year:
                    key = currDate.getFullYear().toString();
                    break;
                default:
                    key = `${currDate.getFullYear()}-${String(currDate.getMonth() + 1).padStart(2, "0")}`;
                    break;
            }

            if (!acc[key]) acc[key] = [curr];
            else acc[key].push(curr);

            return acc;
        }, {});
    }, [data, timeUnit])

    const groups = useMemo<T[][]>(() => Object.values(groupsMap), [groupsMap])

    return { groupsMap, groups }
} 