import type { SearchFormConfig } from "@/components";
import type { CollateralQuery } from "../../models/collateralQuery";
import { Input } from "@/components";

export const collateralSearchConfig: SearchFormConfig<CollateralQuery> = {
    options: [
        { name: "id", label: "Id", width: 2, type: (p) => Input(p) },
        { name: "title", label: "Título", width: 10, type: (p) => Input(p) }
    ],
    advanced: []
}