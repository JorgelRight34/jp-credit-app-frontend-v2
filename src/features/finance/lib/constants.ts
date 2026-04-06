import { getTodayAsInputDate, getTodayWithDaysFromNow, toInputDate } from "@/lib/utils";
import { FinanceQuery } from "../models/financeQuery";

export const financeInitialQuery: FinanceQuery = {
    option: 1,
    startDate: getTodayAsInputDate(),
    endDate: toInputDate(getTodayWithDaysFromNow(2160)),
    interval: 30,
}

export const groupedProjectionsPageSizeIdentifier = "12";