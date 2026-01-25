import { toCurrency } from "@/utils";
import { NumericKeys } from "@/utils/utils";
import type { HeaderContext, Updater } from "@tanstack/react-table";

/**
 * Sums a numeric column from the table's original data and formats it as currency.
 * - Safe against undefined/null and non-numeric values.
 */
export const getFooterTotalAsCurrency = <
    T extends object,
    K extends NumericKeys<T>
>(
    info: HeaderContext<T, unknown>,
    key: K
) => {
    const total = info.table.options.data.reduce((sum, row) => sum + (row[key] as number), 0);

    return toCurrency(total);
};


/**
 * Unwraps TanStack Updater<T> into a value.
 * Works reliably when T is NOT a function type.
 */
export const getUpdaterOrValue = <T>(
    updaterOrValue: Updater<T>,
    prev: T
): T => {
    if (typeof updaterOrValue === "function") {
        return (updaterOrValue as (old: T) => T)(prev);
    }
    return updaterOrValue;
};