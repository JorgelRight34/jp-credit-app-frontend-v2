import { ReportTemplateDefinition } from "../../models/reportTemplateDefinition"

type MappedTemplate = Record<string, string | number | undefined>;

export const mapTemplate = <T,>(obj: T, template: ReportTemplateDefinition<T>): MappedTemplate => {
    const result: MappedTemplate = {};
    const definitions = template.definitions;

    for (const definition of definitions) {
        result[definition.name] = definition.mapper(obj)?.toString();
    }
    return result;
};