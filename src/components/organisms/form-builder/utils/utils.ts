import { NumericKeys, toCurrency } from "@/utils/utils";
import { HeaderContext } from "@tanstack/react-table";
import { FormProvider } from "../models/formProvider";

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

export const getDefaultValues = <T,>(fields: FormProvider<T>["fields"]) => {
    const defaults: Partial<Record<keyof T, null>> = {};

    for (let i = 0; i < fields.length; i++) {
        const name = fields[i].name as keyof T;
        defaults[name] = null;
    }

    return defaults;
}