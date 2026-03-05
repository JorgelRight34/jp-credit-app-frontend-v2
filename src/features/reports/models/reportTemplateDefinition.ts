export type ReportTemplateDefinition<T> = {
    description: string;
    fieldType: "number" | "currency" | "date" | "text";
    name: string;
    nullable?: boolean;
    mapper: (t: T) => string | number | undefined;
}[]