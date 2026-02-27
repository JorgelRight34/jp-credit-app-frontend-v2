import { TimeUnit } from "@/models";
import { Period } from "../models/period";
import dayjs, { Dayjs } from "dayjs";

export function splitIntoPeriods(
    start: Date | string,
    end: Date | string,
    timeUnit: TimeUnit,            // e.g. TimeUnit.day | TimeUnit.month | TimeUnit.year
    daysPerPeriod: number          // for day-based buckets (e.g. 7, 30, 365)
): Array<Period> {
    const dateStart = dayjs(start);
    const dateEnd = dayjs(end);
    const periods: Period[] = [];

    // cursor always moves to previous period's end + 1 day (inclusive)
    let cursor = dateStart;

    while (cursor.isBefore(dateEnd) || cursor.isSame(dateEnd, "day")) {
        let periodStart = cursor;
        let naturalEnd: Dayjs;

        switch (timeUnit) {
            case TimeUnit.year:
                // first chunk starts at actual start; subsequent chunks start at Jan 1
                if (periods.length > 0) periodStart = cursor.startOf("year");
                naturalEnd = periodStart.endOf("year");
                break;

            case TimeUnit.month:
                // first chunk starts at actual start; subsequent chunks start at day 1
                if (periods.length > 0) periodStart = cursor.startOf("month");
                naturalEnd = periodStart.endOf("month");
                break;

            default:
                // day-based bucket (7 days, 30 days, etc.)
                naturalEnd = periodStart.add(daysPerPeriod - 1, "day");
                break;
        }

        const truncated = naturalEnd.isAfter(dateEnd);
        const periodEnd = truncated ? dateEnd : naturalEnd;

        periods.push({
            start: periodStart.toDate(),
            end: periodEnd.toDate(),
        });

        // move cursor to the next day after the end of this period
        cursor = periodEnd.add(1, "day");
    }

    return periods;
}