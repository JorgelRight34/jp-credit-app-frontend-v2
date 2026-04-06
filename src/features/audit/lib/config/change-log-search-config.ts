import { DateInput, Input, SearchFormConfig } from "@/components";
import { ChangeLogQuery } from "../../models/changeLogQuery";

export const changeLogSearchFormConfig: SearchFormConfig<ChangeLogQuery> = {
    options: [{ name: "userId", label: "Usuario", width: 12, type: p => Input(p) }],
    advanced: [
        { name: "minDate", label: "Fecha inicio", width: 6, type: p => DateInput(p) },
        { name: "maxDate", label: "Fecha final", width: 6, type: p => DateInput(p) },
        { name: "date", label: "Fecha", width: 6, type: p => DateInput(p) },
    ]
}