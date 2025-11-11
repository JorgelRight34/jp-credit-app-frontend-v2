import { TimeUnit } from "@/models";
import { FinanceReport } from "../models/financeReport";
import { FinancialBreakdown } from "../models/financialBreakdown";
import { dateToIsoString, getLocaleMonth } from "@/utils/utils";
import dayjs, { Dayjs } from "dayjs";
import { Period } from "../models/period";


export const timeUnitToString = (unit: TimeUnit) => {
  switch (unit) {
    case TimeUnit.year:
      return "año";
    case TimeUnit.month:
      return "mes";
    case TimeUnit.day:
      return "day";
    default:
      return undefined;
  }
};

export const addDays = (date: Date, days: number): Date => {
  const tmp = date;
  tmp.setDate(date.getDate() + days);

  return tmp;
}

export const mapFinanceReportEntriesToDataPoints = (report: FinanceReport, key: string) => {
  return report.items.map((r) => [r.date.toString(), r[key as keyof FinancialBreakdown]])
}

export const getDateGroupingLabel = (input: Date | string, timeUnit: TimeUnit, config?: { minDate: Date, maxDate: Date }): string => {
  const date = new Date(input);

  if (timeUnit === TimeUnit.year) {
    return date.getFullYear().toString();
  }

  const yearA = config?.minDate.getFullYear();
  const yearB = config?.maxDate.getFullYear();

  if (timeUnit === TimeUnit.month) {
    return `${getLocaleMonth(date)}${yearA == yearB ? "" : " " + date.getFullYear()}`
  }

  if (yearA === yearB && yearA !== undefined) {
    return `${getLocaleMonth(date)} ${date.getDate()}`
  }
  return dateToIsoString(date);

}

export function splitIntoPeriods(
  start: Date,
  end: Date,
  timeUnit: TimeUnit,            // e.g. TimeUnit.day | TimeUnit.month | TimeUnit.year
  daysPerPeriod: number          // for day-based buckets (e.g. 7, 30, 365)
): Period[] {
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
