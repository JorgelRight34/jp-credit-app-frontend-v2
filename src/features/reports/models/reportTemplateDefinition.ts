export interface ReportTemplateDefinition {
    entity: string;
    fields: Record<string, {
        description: string;
        propertyPath: string;
        fieldType: string;
    }>
}