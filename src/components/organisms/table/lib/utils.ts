import type { HeaderContext, Updater } from "@tanstack/react-table";
import type { NumericKeys } from "@/lib/utils/utils";
import { toCurrency } from "@/lib/utils";

/**
 * Sums a numeric column from the table's original data and formats it as currency.
 * - Safe against undefined/null and non-numeric values.
 */
export const getFooterTotalAsCurrency = <
    T extends object,
    TKey extends NumericKeys<T>
>(
    info: HeaderContext<T, unknown>,
    key: TKey
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