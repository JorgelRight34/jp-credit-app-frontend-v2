import { buildSelectWithOptions, ChartType, DateInput, DaysIntervalSelect, SearchFormConfig, SelectOptions } from "@/components";
import { FinanceQuery } from "../../models/financeQuery";

const baseOptions: SearchFormConfig<FinanceQuery>["options"] = [
    { name: "startDate", width: 4, label: "Inicio", type: p => DateInput(p) },
    { name: "endDate", width: 4, label: "Fin", type: p => DateInput(p) },
    {
        name: "options", width: 3, label: "Opciones", type: buildSelectWithOptions([
            [1, "Ultimo mes"],
            [3, "Ultimos 3 meses"],
            [6, "Ultimos 6 meses"],
        ])
    },
    { name: "interval", width: 4, label: "Intervalo", type: p => DaysIntervalSelect(p) }
]

export const financeTableSearchConfig: SearchFormConfig<FinanceQuery> = {
    options: baseOptions,
    advanced: [],
}

export const financeChartSearchConfig: SearchFormConfig<FinanceQuery> = {
    options: baseOptions,
    advanced: [
        {
            name: "chart", width: 12, label: "Gráfica", type: buildSelectWithOptions([
                ["linear", "Linear"],
                ["pie", "Pie"],
                ["bar", "Barras"],
            ] as SelectOptions<ChartType>)
        },
        { name: "vsStartDate", width: 6, label: "VS Fecha inicio", type: p => DateInput(p) },
        { name: "vsEndDate", width: 6, label: "VS Fecha final", type: p => DateInput(p) }

    ],
}