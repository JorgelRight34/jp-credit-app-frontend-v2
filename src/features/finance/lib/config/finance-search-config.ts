import {
    withFormWatchSelectOptions,
    withSelectOptions,
    ChartType,
    DateInput,
    DaysIntervalSelect,
    SearchFormConfig,
    SelectOptions,
    WatchedValuesChangeHandler
} from "@/components";
import { FinanceQuery } from "../../models/financeQuery";
import { getTodayAsInputDate, getTodayWithDaysFromNow, toInputDate } from "@/lib/utils";
import { exportProjections } from "../../services/financeService";

const onFinanceOptionChange: WatchedValuesChangeHandler<FinanceQuery> = (context) => {
    if (!context.formState.isDirty) return;

    const { option } = context.getValues();
    if (option) {
        let days = 0;
        switch (option) {
            case 1:
                days = 30
                break;
            case 3:
                days = 90;
                break;
            case 6:
                days = 120;
                break;
        }

        context.setValue("startDate", toInputDate(getTodayWithDaysFromNow(-days)))
        context.setValue("endDate", getTodayAsInputDate());
    }
}

export const financeBaseAdvancedOptions: SearchFormConfig<FinanceQuery>["advanced"] = [
    {
        name: "chart", width: 12, label: "Gráfica", type: withSelectOptions([
            ["linear", "Linear"],
            ["pie", "Pie"],
            ["bar", "Barras"],
        ] as SelectOptions<ChartType>)
    },
    { name: "vsStartDate", width: 6, label: "VS Fecha inicio", type: p => DateInput(p) },
    { name: "vsEndDate", width: 6, label: "VS Fecha final", type: p => DateInput(p) }
]

export const financeBaseOptions: SearchFormConfig<FinanceQuery>["options"] = [
    { name: "startDate", width: 4, label: "Inicio", type: p => DateInput(p) },
    { name: "endDate", width: 4, label: "Fin", type: p => DateInput(p) },
    {
        name: "option", width: 3, label: "Opciones", type: withFormWatchSelectOptions<FinanceQuery>([
            [1, "Ultimo mes"],
            [3, "Ultimos 3 meses"],
            [6, "Ultimos 6 meses"],
        ], {
            watchedValues: ["option"], onWatchedValuesChange: onFinanceOptionChange
        })
    },
    { name: "interval", width: 4, label: "Intervalo", type: p => DaysIntervalSelect(p) }
]

export const financeChartSearchConfig: SearchFormConfig<FinanceQuery> = {
    options: financeBaseOptions,
    advanced: financeBaseAdvancedOptions,
    onExport: exportProjections
}

export const financeTableSearchConfig: SearchFormConfig<FinanceQuery> = {
    options: financeBaseOptions,
    advanced: [],
    onExport: exportProjections
}