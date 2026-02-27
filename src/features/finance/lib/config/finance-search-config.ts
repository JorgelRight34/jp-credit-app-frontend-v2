import { DateInput, DaysIntervalSelect, SearchFormConfig, SelectInput } from "@/components";
import { FinanceQuery } from "../../models/financeQuery";

export const financeSearchConfig: SearchFormConfig<FinanceQuery> = {
    options: [
        { name: "startDate", width: 4, label: "Inicio", type: p => DateInput(p) },
        { name: "endDate", width: 4, label: "Fin", type: p => DateInput(p) },
        { name: "interval", width: 4, label: "Intervalo", type: p => DaysIntervalSelect(p) },
    ],
    advanced: [
        { name: "scale", width: 12, label: "Escala", type: p => SelectInput(p) }
    ],
    defaultValues: { startDate: "", endDate: "", interval: "", scale: "" }
}