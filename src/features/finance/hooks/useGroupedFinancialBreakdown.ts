import { TimeUnit } from "@/models"
import { useMemo } from "react";

interface UseGroupedFinancialBreakdownProps<T extends { date: Date | string }> {
    timeUnit?: TimeUnit;
    data?: Array<T>;
};

export const useGroupedFinancialBreakdown = <T extends { date: Date | string }>(
    { data, timeUnit }: UseGroupedFinancialBreakdownProps<T>): [T[][], string[]] => {

    return useMemo(() => {
        if (!data) return [[], []];

        const map = data.reduce<Record<string, T[]>>((acc, curr) => {
            const currDate = new Date(curr.date);
            let key: string;

            switch (timeUnit) {
                case TimeUnit.year:
                    key = currDate.getUTCFullYear().toString();
                    break;
                default:
                    key = `${currDate.getUTCFullYear()}-${String(currDate.getUTCMonth() + 1).padStart(2, "0")}`;
                    break;
            }

            if (!acc[key]) acc[key] = [curr];
            else acc[key].push(curr);

            return acc;
        }, {});

        return [Object.values(map), Object.keys(map)];
    }, [data, timeUnit])
}