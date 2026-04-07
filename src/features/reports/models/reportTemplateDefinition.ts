export type ReportTemplateDefinition<T> = {
    title: string;
    label: string;
    definitions: {
        description: string;
        fieldType: "number" | "currency" | "date" | "text";
        name: string;
        nullable?: boolean;
        mapper: (t: T) => string | number | undefined;
    }[]
}