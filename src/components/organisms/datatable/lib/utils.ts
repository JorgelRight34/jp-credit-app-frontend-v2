import { NumericKeys, toCurrency } from "@/utils/utils";
import { HeaderContext } from "@tanstack/react-table";

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
