import { DateRange } from "@/models";
import dayjs from "dayjs";

export function toDateRange(arr?: [string, string] | Date[] | unknown): DateRange | null {
    if (Array.isArray(arr) && arr.length > 1) {
        const startDate = dayjs(arr[0]);
        const endDate = dayjs(arr[1]);

        if (!startDate.isValid() || !endDate.isValid()) {
            return null;
        }
    }

    return null;
}