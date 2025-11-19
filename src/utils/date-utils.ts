import { Row } from "@/components";
import dayjs from "dayjs";

/** Normalize date to 00:00:00 */
export const normalizeDate = (d: Date) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    return date;
};

/** Format to French locale (or "---" if invalid) */
export const toFormattedDate = (date: string | Date): string => {
    if (!(date instanceof Date)) date = new Date(date);
    if (isNaN(date.getTime())) return "---";

    try {
        return new Intl.DateTimeFormat("fr-FR").format(date);
    } catch {
        return date.toString();
    }
};

/** Full Spanish date string: "Lunes, 3 de Enero de 2024" */
export const getFullDateString = (date?: string | Date): string => {
    if (!date) return "";
    let d: Date;

    if (typeof date === "string") {
        const [year, month, day] = date.split("T")[0].split("-").map(Number);
        d = new Date(year, month - 1, day);
    } else {
        d = date;
    }

    const result = d.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return result === "Invalid Date"
        ? "---"
        : result[0].toUpperCase() + result.slice(1);
};

/** Returns YYYY-MM-DD */
export const getPartialDateString = (date: string | Date): string => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
};

/** Today in ISO (YYYY-MM-DD) */
export const getTodayFormattedDate = () => {
    const today = new Date();
    return dateToIsoString(today);
};

/** Future date (days from now) in ISO */
export const getFutureFormattedDateWithDaysFromNow = (days: number) => {
    const future = getTodayWithDaysFromNow(days);
    return dateToIsoString(future);
};

/** Convert date to a specific string format */
export const dateToStringFormat = (
    date?: Date | string,
    format: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD' | 'locale' = "YYYY-MM-DD"
) => {
    if (!date) return "";

    const dateObj = typeof date === "string" ? new Date(date) : date;

    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");

    switch (format) {
        case 'DD/MM/YYYY':
            return `${dd}/${mm}/${yyyy}`;
        case 'MM/DD/YYYY':
            return `${mm}/${dd}/${yyyy}`;
        case 'YYYY-MM-DD':
            return `${yyyy}-${mm}-${dd}`;
        default:
            return dateObj.toLocaleDateString(navigator.language, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
    }
};

/** ISO yyyy-mm-dd using dayjs */
export const dateToIsoString = (date?: Date | string) =>
    dayjs(date).toISOString().split("T")[0];

/** Today + days */
export const getTodayWithDaysFromNow = (days = 30) => {
    const today = new Date();
    today.setDate(today.getDate() + days);
    return today;
};

/** TanStack sort comparator for dates */
export const sortDateRows = <TData,>(
    rowA: Row<TData>,
    rowB: Row<TData>,
    columnId: string
) => {
    const dateA = new Date(rowA.getValue(columnId));
    const dateB = new Date(rowB.getValue(columnId));
    return dateA.getTime() - dateB.getTime();
};

/** Age calculator */
export const getAge = (dateOfBirth: Date | string) => {
    const today = new Date();
    if (typeof dateOfBirth === "string") dateOfBirth = new Date(dateOfBirth);

    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const month = today.getMonth() - dateOfBirth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate()))
        age--;

    return age;
};

/** Difference in full days */
export const getDayTimeDifference = (startDate?: Date, endDate?: Date) => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffMs = end.getTime() - start.getTime();
    return diffMs / (1000 * 60 * 60 * 24);
};

/** Localized month name */
export const getLocaleMonth = (dateInput: Date | string) => {
    const date = new Date(dateInput);
    return date.toLocaleString(undefined, { month: "long" });
};

/** Current year */
export const getCurrentYear = () => new Date().getFullYear();


export const TimeSpan = {
    fromMinutes: (minutes: number) => 60 * minutes,
    fromDays: (days: number) => 60 * 60 * days
}