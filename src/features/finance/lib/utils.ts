import { TimeUnit } from "@/models";
import { Period } from "../models/period";
import dayjs, { Dayjs } from "dayjs";

type EndComputer = (cursor: Dayjs) => Dayjs

export function splitIntoPeriods(
    start: Date | string,
    end: Date | string,
    timeUnit: TimeUnit,
    daysPerPeriod: number
): Array<Period> {
    const dateStart = dayjs(start);
    const dateEnd = dayjs(end);
    const periods: Period[] = [];

    // cursor always moves to previous period's end + 1 day (inclusive)
    let cursor = dateStart;
    const computeNaturalEnd = getEndComputer(timeUnit, daysPerPeriod)

    while (cursor.isBefore(dateEnd) || cursor.isSame(dateEnd, "day")) {
        const naturalEnd = computeNaturalEnd(cursor)
        const periodEnd = naturalEnd.isAfter(dateEnd) ? dateEnd : naturalEnd

        periods.push({
            start: cursor.toDate(),
            end: periodEnd.toDate(),
        })

        cursor = periodEnd.add(1, 'day')
    }

    return periods;
}

const getEndComputer = (timeUnit: TimeUnit, daysPerPeriod: number): EndComputer => {
    switch (timeUnit) {
        case TimeUnit.year:
            return (cursor) => cursor.endOf('year')
        case TimeUnit.month:
            return (cursor) => cursor.endOf('month')
        default:
            return (cursor) => cursor.add(daysPerPeriod - 1, 'day')
    }
}