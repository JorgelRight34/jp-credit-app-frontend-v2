import { FormInterceptor } from "../models/formInterceptor";
import { dateToIsoString } from "@/lib/utils/utils";
import { Query } from "@/models/query";
import { DateRange } from "../../date-range-input/models/dateRange";

export const createDateRangeFormInterceptor = <T extends Query>(
    names: [keyof T, keyof T] = ["startDate", "endDate"],
    source: keyof T = "date" as keyof T
): FormInterceptor<T> => {
    return (data: T) => {
        if (data[source] === undefined) return data;

        const { startDate, endDate } = data[source] as DateRange;

        return {
            ...data,
            [source]: undefined,
            [names[0]]: dateToIsoString(startDate),
            [names[1]]: dateToIsoString(endDate),
        };
    };
};

export const createDateRangeStringQueryInterceptor = <T extends Query>(
    names: [keyof T, keyof T] = ["startDate", "endDate"],
    source: keyof T = "date" as keyof T,
): FormInterceptor<T> => {
    return (data: T) => {
        return {
            ...data,
            [source]: undefined,
            [names[0]]: dateToIsoString(data[names[0]] as Date),
            [names[1]]: dateToIsoString(data[names[1]] as Date),
        };
    };
};


export const dateRangeFormInterceptor = createDateRangeFormInterceptor;