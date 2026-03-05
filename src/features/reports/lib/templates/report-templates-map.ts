import { ReportTemplateDefinition } from "../../models/reportTemplateDefinition";
import { Report } from "../../models/report";
import { loanTemplateDefinition } from "./loan-template-definition";
import { collateralTemplateDefinition } from "./collateral-template-definition";

export const templateMapper = <T,>(obj: T, template: ReportTemplateDefinition<T>) => {
    const result: Record<string, string | number | undefined> = {}

    for (const definition of template) {
        result[definition.name] = definition.mapper(obj)?.toString();
    }

    return result
}

export const reportTemplatesDefinition: Record<Report["key"], ReportTemplateDefinition<any>> = {
    loan: loanTemplateDefinition,
    collateral: collateralTemplateDefinition
}