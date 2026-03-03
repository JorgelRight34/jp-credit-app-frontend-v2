import type { SearchFormConfig } from "@/components";
import type { CollateralQuery } from "../../models/collateralQuery";
import { CurrencyInput, Input } from "@/components";
import { exportCollaterals } from "../../services/collateralClient";

export const collateralSearchConfig: SearchFormConfig<CollateralQuery> = {
    options: [
        { name: "id", label: "Id", width: 2, type: (p) => Input(p) },
        { name: "title", label: "Título", width: 10, type: (p) => Input(p) }
    ],
    advanced: [
        { name: "minValue", label: "Valor mínimo", width: 6, type: (p) => CurrencyInput(p) },
        { name: "maxValue", label: "Valor máximo", width: 6, type: (p) => CurrencyInput(p) }
    ],
    onExport: exportCollaterals
}